import { TeamType } from '@/schemas/team';

export type EventCardWrapperProps = {
  data: {
    name: string;
  }[];
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
};
