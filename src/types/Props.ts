import { EVENT_TYPE } from '@/enums/Event';
import { TeamType } from '@/schemas/team';

export type EventCardWrapperProps = {
  data: {
    name: string;
  }[];
  showParticipants: boolean;
  addParticipants: boolean;
};

export type EventCardWrapperVersionTwoProps = {
  data: {
    eventName: string;
  }[];
};

export type EventCardProps = {
  eventName: string;
};

export type TeamCardProps = {
  team?: TeamType;
  index?: number;
  onDelete?: (index: number) => void;
};

export type CreateTeamFormProps = {
  teams: TeamType[] | undefined;
  setTeam: (team: TeamType[]) => void;
  teamSize: EVENT_TYPE;
  totalTeams: number;
};
