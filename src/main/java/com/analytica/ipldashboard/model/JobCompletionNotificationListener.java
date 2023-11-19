package com.analytica.ipldashboard.model;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Transactional
public class JobCompletionNotificationListener implements JobExecutionListener {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    // JDBC is database-dependent, which means that different scripts must be written
    // for different databases
//    private final JdbcTemplate jdbcTemplate;

//    @Autowired
//    public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
//        this.jdbcTemplate = jdbcTemplate;
//    }

    // high level than jdbc,EntityManager is JPA way of talking to database
    private final EntityManager em;

    @Autowired
    public JobCompletionNotificationListener(EntityManager entityManager) {
        this.em = entityManager;
    }

    @Override
    public void beforeJob(JobExecution jobExecution) {

    }

    @Override
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            //  this is how jdbc is used

//            jdbcTemplate
//                    .query("SELECT team1, team2 FROM match",(rs,rw)->"Team 1: "+
//                            rs.getString(1)+"Team 2: "+rs.getString(2))
//                    .forEach(str-> System.out.println(str));


            }
            Map<String,Team> teamData=new HashMap<>();

            em.createQuery("select m.team1, COUNT(*) from Match m GROUP BY m.team1",Object[].class)
                    .getResultList()
                    .stream()
                    .map(e->new Team((String) e[0],(Long)e[1]))
                    .forEach(team->teamData.put( team.getTeamName(),team));

        em.createQuery("select m.team2, COUNT(*) from Match m GROUP BY m.team2",Object[].class)
                    .getResultList()
                .stream()
                    .forEach(e->{
                        Team team=teamData.get((String)e[0]);
                        team.setTotalMatches(team.getTotalMatches()+ (Long)e[1]);
                    });


        em.createQuery("select m.winner, COUNT(*) from Match m GROUP BY m.winner",Object[].class)
                .getResultList()
                .stream()
                .forEach(e->{
                    Team team=teamData.get((String)e[0]);
                    team.setTotalWins((Long)e[1]);
                });
            teamData.values().forEach(team->{em.persist(team);});
        }
    }