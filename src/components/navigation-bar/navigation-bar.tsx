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
import { ResponsiveAppBarProps } from '@/types/ResponsiveAppBarProps';

const pages = ['Home', 'About Us', 'Users', 'Partners', 'Login', 'Connect'];

function ResponsiveAppBar(props: ResponsiveAppBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const theme = useTheme();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToSection = (ref: React.MutableRefObject<any>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClickNavItem = (index: number) => {
    if (index === 0)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    if (index === 1) scrollToSection(props.aboutUsRef);
    if (index === 2) scrollToSection(props.usersRef);
    if (index === 3) scrollToSection(props.partnersRef);
    if (index === 4) scrollToSection(props.formsRef);
    if (index === 5) scrollToSection(props.connectRef);
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    variant="body2"
                    textAlign="center"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {page}
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                variant="text"
                key={page}
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
                  {page}
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
export default ResponsiveAppBar;
