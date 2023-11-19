package com.analytica.ipldashboard.repository;

import com.analytica.ipldashboard.model.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {

    //we can get top 4 elements using sql query
    //another way is to use pageable
    List<Match> getByTeam1OrTeam2OrderByDateDesc(String team1, String team2, Pageable pageable);


    // we will be using default method bcoz we want pageRequest must not present in
    //controller class. we can also made this in a seprate class Dao then using repo from there.
    //default can have implementation in interface and not need to override it everywher
    default List<Match> getLatestMatchByTeams(String teamName,int cnt){
        PageRequest pageable = PageRequest.of(0, cnt);
        return getByTeam1OrTeam2OrderByDateDesc(teamName,teamName,pageable);

    }

//    List<Match> getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(String team1, LocalDate yearStart,LocalDate yearEnd,
//                                                                             String team2, LocalDate yearS,LocalDate yearE);

    @Query("select m from Match m where (m.team1=:teamName or m.team2=:teamName) and m.date between :startYear and :endYear ORDER BY m.date DESC")
    List<Match> getByTeamNameAndDateBetween(@Param("teamName") String teamName, @Param("startYear")LocalDate startYear , @Param("endYear")LocalDate endYear);
}
