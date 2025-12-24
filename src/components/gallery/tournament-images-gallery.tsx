'use client';

import React, { useEffect, useState } from 'react';
import { ParallaxGridScroll } from '../ui/parallax-grid-scroll';
import { fetchImagesForTournament } from '@/services/getInternalAPI';
import { CircularProgress, Box, Typography } from '@mui/material';

interface TournamentImagesGalleryProps {
  tournamentName: string;
}

interface Image {
  imageName: string;
  imagePath: string;
}

export function TournamentImagesGallery({
  tournamentName,
}: TournamentImagesGalleryProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const response = await fetchImagesForTournament(tournamentName);
        if (response.data) {
          setImages(response.data);
        } else {
          setError(response.errorMessage || 'Failed to load images');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (tournamentName) {
      loadImages();
    }
  }, [tournamentName]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center h-64">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (images.length === 0) {
    return (
      <Box className="flex justify-center items-center h-64">
        <Typography>No images found for this tournament.</Typography>
      </Box>
    );
  }

  return (
    <div className="h-screen w-full">
      <ParallaxGridScroll images={images} />
    </div>
  );
}
