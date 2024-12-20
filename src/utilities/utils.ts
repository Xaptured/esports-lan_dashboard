import { localDomain } from '@/constants/configuration-constannts';
import { TeamPayload, TeamType } from '@/schemas/team';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function domainProvider(endpoint: string) {
  return `${localDomain}${endpoint}`;
}

export function getGreeting(): string {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return 'Good morning';
  } else if (hours < 18) {
    return 'Good afternoon';
  } else if (hours < 21) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
}

type GreetingCallback = (message: string) => void;

export function startGreetingInterval(callback: GreetingCallback): void {
  // Set an interval to check every 5 minutes (300000 ms)
  setInterval(() => {
    callback(getGreeting());
  }, 300000);
}

export function checkForDuplicateEmails(emails: string[]): {
  hasDuplicates: boolean;
  duplicates: string[];
} {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  emails.forEach((email) => {
    if (seen.has(email)) {
      duplicates.add(email);
    } else {
      seen.add(email);
    }
  });

  return {
    hasDuplicates: duplicates.size > 0,
    duplicates: Array.from(duplicates),
  };
}

export function validateTeamArray(teams: TeamType[]) {
  const teamNameSet = new Set<string>();
  const emailSet = new Set<string>();
  const duplicateTeamNames: string[] = [];
  const duplicateEmails: string[] = [];

  for (const team of teams) {
    if (teamNameSet.has(team.teamName)) {
      duplicateTeamNames.push(team.teamName);
    }
    teamNameSet.add(team.teamName);

    for (const email of team.teammateEmails) {
      if (emailSet.has(email)) {
        duplicateEmails.push(email);
      }
      emailSet.add(email);
    }
  }

  return {
    isTeamNameUnique: duplicateTeamNames.length === 0,
    isEmailUnique: duplicateEmails.length === 0,
    duplicateTeamNames,
    duplicateEmails,
  };
}

export function prepareSaveTeamsPayload(
  teams: TeamType[],
  eventName: string
): TeamPayload[] {
  return teams.map((team) => ({
    teamName: team.teamName,
    eventName: eventName,
    status: 'PENDING',
    teamMates: team.teammateEmails.map((email) => ({
      email,
      isEmailRegistered: false,
    })),
  }));
}

export function prepareTeams(teamPayload: TeamPayload[]): TeamType[] {
  return teamPayload.map((convertedTeam) => ({
    teamName: convertedTeam.teamName,
    teammateEmails: convertedTeam.teamMates.map((teamMate) => teamMate.email),
  }));
}

export const generateMerchantTransactionID = () => {
  const shortUUID = uuidv4().replace(/-/g, '').slice(0, 10);
  const completeUUID = 'MTID' + shortUUID;
  return completeUUID;
};
