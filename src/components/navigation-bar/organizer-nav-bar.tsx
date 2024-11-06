'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ThemeButton from '../theme/theme-button';
import { useTheme } from '@mui/material';
import { organizerTabs } from '@/constants/configuration-constannts';
import { useRouter } from 'next/navigation';

function OrganizerNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const theme = useTheme();
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickNavItem = (index: number) => {
    if (index === 0) router.push('/organizer-home');
    else if (index === 1) router.push('/organizer-home/bookings');
    else if (index === 2) router.push('/organizer-home/check-in');
    else router.push('/organizer-home/help');
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Container
        sx={{ backgroundColor: theme.palette.background.default }}
        maxWidth="2xl"
      >
        <Toolbar disableGutters>
          <Typography
            variant="h2"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: 'none', md: 'flex' },
              color: theme.palette.text.primary,
              textDecoration: 'none',
            }}
          >
            ESports-LAN
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                color: theme.palette.text.primary,
              }}
            >
              {organizerTabs.map((tab, index) => (
                <MenuItem key={tab} onClick={() => handleClickNavItem(index)}>
                  <Typography
                    variant="body2"
                    textAlign="center"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {tab}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h2"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              color: theme.palette.text.primary,
              textDecoration: 'none',
            }}
          >
            ESports-LAN
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'end',
            }}
          >
            {organizerTabs.map((tab, index) => (
              <Button
                variant="text"
                key={tab}
                onClick={() => handleClickNavItem(index)}
                sx={{
                  my: 2,
                  color: theme.palette.text.primary,
                  display: 'block',
                }}
              >
                <Typography
                  variant="body2"
                  textAlign="center"
                  sx={{ color: theme.palette.text.primary }}
                >
                  {tab}
                </Typography>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Change theme">
              <ThemeButton />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default OrganizerNavBar;
