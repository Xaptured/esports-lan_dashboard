import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { teamKeys, teamSchema, TeamType } from '@/schemas/team';
import {
  Box,
  Button,
  Slide,
  Snackbar,
  Typography,
  useTheme,
} from '@mui/material';
import { Label } from '@radix-ui/react-label';
import { CustomInput } from '../ui/custom-input';
import { checkForDuplicateEmails, cn } from '@/utilities/utils';
import { CreateTeamFormProps } from '@/types/Props';
import CenterButton from '../button/center-button';
import { EVENT_TYPE } from '@/enums/Event';

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};

export const CreateTeamForm = (props: CreateTeamFormProps) => {
  const theme = useTheme();
  const [loading, setLoading] = React.useState<boolean>(false);
  let teamSizeCount = 1;
  if (props.teamSize === EVENT_TYPE.SOLO) {
    teamSizeCount = 1;
  }
  if (props.teamSize === EVENT_TYPE.DUO) {
    teamSizeCount = 2;
  }
  if (props.teamSize === EVENT_TYPE.SQUAD) {
    teamSizeCount = 4;
  }
  const {
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TeamType>({
    resolver: zodResolver(teamSchema(teamSizeCount)),
  });

  const emails = watch('teammateEmails');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teammateEmails' as never,
  });
  const [snackBar, setSnackBar] = useState<string | undefined>(undefined);

  const onSubmit = (data: TeamType) => {
    if (props.teams && props.teams?.length >= props.totalTeams) {
      setSnackBar('All team slots are filled');
    } else {
      const result = checkForDuplicateEmails(data.teammateEmails);
      if (result.hasDuplicates) {
        setSnackBar('Duplicate emails not allowed');
      } else {
        if (props.teams) {
          props.setTeam([...props.teams, data]);
        } else {
          props.setTeam([data]);
        }
      }
    }
  };

  const handleAddTeamMate = () => {
    if (emails[emails.length - 1] === '') {
      setError(`teammateEmails.${fields.length - 1}`, {
        message: 'Email should not be blank',
      });
    } else {
      clearErrors(`teammateEmails.${fields.length - 1}`);
      append('');
    }
  };

  return (
    <Box className="max-w-md w-full mx-auto  p-4 md:p-8 ">
      <form className="my-2" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-8">
          <Label htmlFor={teamKeys.teamName}>
            <Typography
              variant="body2"
              align="left"
              gutterBottom={false}
              noWrap={false}
              sx={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
              }}
            >
              Team name
            </Typography>
          </Label>
          <CustomInput
            id={teamKeys.teamName}
            placeholder="Team name"
            type="text"
            name={teamKeys.teamName}
            control={control}
            error={errors.teamName?.message ? true : false}
            helperText={errors.teamName?.message}
          />
        </LabelInputContainer>
        {fields.length > 0 && (
          <LabelInputContainer className="mb-12">
            {fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <CustomInput
                  id={`teammateEmails.${index}`}
                  placeholder={`Teammate ${index + 1} email`}
                  type="email"
                  name={`teammateEmails.${index}`}
                  control={control}
                  error={errors.teammateEmails?.[index] ? true : false}
                  helperText={
                    errors.teammateEmails &&
                    errors.teammateEmails[index]?.message
                  }
                />
                {fields.length > 1 && (
                  <Button type="button" onClick={() => remove(index)}>
                    Remove
                  </Button>
                )}
              </Box>
            ))}
          </LabelInputContainer>
        )}

        {fields.length < teamSizeCount && (
          <Button type="button" onClick={handleAddTeamMate}>
            Add Teammate
          </Button>
        )}
        <Snackbar
          open={snackBar ? true : false}
          autoHideDuration={5000}
          onClose={() => setSnackBar(undefined)}
          message={snackBar}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          TransitionComponent={Slide}
        />
        <CenterButton
          buttonType="submit"
          buttonText="submit"
          size="large"
          styleString="w-full"
          icon={false}
          padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
          fontSize="16"
          isLoading={loading}
        />
      </form>
    </Box>
  );
};
