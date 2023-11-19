package com.analytica.ipldashboard.controller;

import com.analytica.ipldashboard.model.Match;
import com.analytica.ipldashboard.model.Team;
import com.analytica.ipldashboard.repository.MatchRepository;
import com.analytica.ipldashboard.repository.TeamRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
public class TeamController {
    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("team/{teamName}")
    Team getTeamByname(@PathVariable String teamName) {
        Team team = this.teamRepository.getTeamByTeamName(teamName);
        team.setMatches(matchRepository.getLatestMatchByTeams(teamName, 4));
        return team;
    }
    @GetMapping("team")
    List<Team> getTeamByname() {
     return teamRepository.findAll();
    }

    @GetMapping("team/{teamName}/match")
    List<Match> getMatchByname(@PathVariable String teamName , @RequestParam Integer year) {

        LocalDate dateStart=LocalDate.of(year,1,1);
        LocalDate dateEnd=LocalDate.of(year+1,1,1);
//       return matchRepository.getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(teamName,dateStart,dateEnd,teamName,dateStart,dateEnd);
       return matchRepository.getByTeamNameAndDateBetween(teamName,dateStart,dateEnd);
    }
}
