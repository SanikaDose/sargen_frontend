'use client';
import { Analytics, Rocket, TrendingUp, BarChart } from '@mui/icons-material';
import { Box, Container, Typography, Card, CardContent, Grid, Button, useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Props } from './unprotected.types';
import { CustomButton } from '@/components/CustomButton/CustomButton';

const ClientLayout = ({ children }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const keyFeatures = [
    {
      icon: <Analytics sx={{ color: '#ff6b9d', fontSize: '2rem' }} />,
      title: 'AI-Powered Insight',
      description: 'Scientific assessment across 16 business functions.',
    },
    {
      icon: <Rocket sx={{ color: '#4ecdc4', fontSize: '2rem' }} />,
      title: 'Strategic Roadmap',
      description: 'Clear execution plan with ROI-driven prioritization.',
    },
    {
      icon: <BarChart sx={{ color: '#45b7d1', fontSize: '2rem' }} />,
      title: 'Investment Clarity',
      description: 'Forecasted KPIs and cost-benefit projections.',
    },
  ];

  const currentPath = usePathname();

  const getNavItems = () => {
    if (currentPath.includes('/register')) {
      return [
        { label: 'Login', href: '/login' },
        { label: 'Enquiry', href: '/enquiry' },
      ];
    } else if (currentPath.includes('/enquiry')) {
      return [
        { label: 'Register', href: '/register' },
        { label: 'Login', href: '/login' },
      ];
    } else {
      return [
        { label: 'Register', href: '/register' },
        { label: 'Enquiry', href: '/enquiry' },
      ];
    }
  };

  return (
    <Box
      sx={{
        // height: '100%',
        height: { xs: 'auto', lg: '100%' },
        backgroundColor: '#f8fafc',
      }}
    >
      {/* Navigation Bar */}
      <Box
        component="nav"
        sx={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          zIndex: 1100,
          height: '7%',
        }}
      >
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
            }}
          >
            <Typography
              component="img"
              src="/sargen-png-logo.png"
              alt="Sargen Logo"
              sx={{
                height: 48,
                width: 'auto',
                cursor: 'pointer',
              }}
            />
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 4,
                alignItems: 'center',
              }}
            >
              {getNavItems().map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <Button variant={'contained'}>{item.label}</Button>
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* main section */}

      <Box
        sx={{
          width: '100%',
          height: '86%',
          display: 'flex',
          px: 4,
          flexDirection: { xs: 'column', md: 'column', lg: 'row' },
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row', lg: 'row' },
            gap: { xs: '10px', lg: '0px' },
            height: { xs: 'auto', md: 'auto', lg: '100%' },
          }}
        >
          {/* Left Section - Main Content (Fixed) */}
          <Box
            sx={{
              width: { xs: '100%', lg: '70%' },
              height: { xs: 'auto', lg: '100%' },
              pr: { lg: 4 },
              // overflowY: { md: 'auto', lg: 'hidden' },
              position: 'sticky',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Main Heading */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '2rem', md: '2.5rem', lg: '2.75rem', xl: '3rem', xxl: '3rem' },
                color: '#1e293b',
                lineHeight: 1.2,
                mb: { xs: '2px', md: '2.5px', lg: '2.5px', xl: '3px', xxl: '3px' },
              }}
            >
              From Assessment to Action:
              <br />
              <Box
                component="span"
                sx={{ color: '#1976d2', fontSize: { xs: '2rem', md: '2.5rem', lg: '2.75rem', xl: '3rem', xxl: '3rem' } }}
              >
                Your Strategic Partner for Industry 4.0 Transformation
              </Box>
            </Typography>

            {/* Description */}
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: '#64748b',
                mb: 2,
                lineHeight: 1.6,
                fontSize: '1.125rem',
                fontWeight: 400,
              }}
            >
              SARGEN empowers manufacturing companies to assess their digital maturity, generate strategic roadmaps, and drive data-driven
              Industry 4.0 decisions.
            </Typography>

            {/* Feature Cards */}
            <Grid container spacing={3} sx={{ mb: 2 }}>
              {keyFeatures.map((feature, index) => (
                <Grid sx={{ xs: 12, md: 4 }} key={index}>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        color: '#1e293b',
                        mb: 1,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#64748b',
                        lineHeight: 1.5,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* CTA Button */}
            <CustomButton
              width={isSmallScreen ? '50%' : isMediumScreen ? '32%' : '35%'}
              endIcon={<TrendingUp />}
              onClick={() => router.push('/register')}
            >
              Start Your Assessment →
            </CustomButton>
          </Box>

          {/* Right Section - Login Card */}
          <Box sx={{ height: 'auto', overflowY: 'auto', width: { xs: '100%', lg: '30%' } }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 4 }}>{children}</CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderTop: '1px solid #e2e8f0',
          py: 3,
          height: '7%',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/privacyAndPolicies"
              style={{
                textDecoration: 'none',
                color: '#64748b',
                fontSize: '0.875rem',
              }}
            >
              Privacy Policy
            </Link>
            <Box sx={{ color: '#cbd5e1' }}>|</Box>
            <Link
              href="/termsToUse"
              style={{
                textDecoration: 'none',
                color: '#64748b',
                fontSize: '0.875rem',
              }}
            >
              Terms of Use
            </Link>
            <Box sx={{ color: '#cbd5e1' }}>|</Box>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              © {new Date().getFullYear()} Elansol Technologies Private Limited
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ClientLayout;
