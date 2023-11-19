package com.analytica.ipldashboard.repository;

import com.analytica.ipldashboard.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team,Long> {
    Team getTeamByTeamName(String teamName);
}
