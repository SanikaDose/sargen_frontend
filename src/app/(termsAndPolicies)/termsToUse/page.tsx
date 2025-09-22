'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function TermsOfServicePage() {
  return (
    <Box>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Box
          component="nav"
          sx={{
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            zIndex: 1100,
            height: '7%',
          }}
        ></Box>
        <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
          Sargen – Terms of Service
        </Typography>

        {/* Back Arrow */}
        <Box sx={{ mt: 2 }}>
          <ArrowBackIcon onClick={() => window.history.back()} cursor="pointer" titleAccess="Go back" />
        </Box>

        {/* 1. Acceptance of Terms */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1">By using Sargen, you agree to these Terms of Service and our Privacy Policy.</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 2. Eligibility */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            2. Eligibility
          </Typography>
          <Typography variant="body1">You must be at least 18 years old.</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 3. Permitted Use */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            3. Permitted Use
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            You may:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Answer assessment questions." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Access and download your reports." />
            </ListItem>
          </List>

          <Typography variant="subtitle1" fontWeight="bold">
            You may not:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Engage in illegal activities." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Harass other users." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Scrape, reverse engineer, or attempt to bypass security systems." />
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 4. Account Security */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            4. Account Security
          </Typography>
          <Typography variant="body1">You are responsible for safeguarding your account credentials.</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 5. Intellectual Property */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            5. Intellectual Property
          </Typography>
          <Typography variant="body1">
            All assessment tools, algorithms, and generated reports are the intellectual property of Elansol Technologies.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 6. Data Protection */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            6. Data Protection Compliance
          </Typography>
          <Typography variant="body1">
            We handle your data in compliance with GDPR, UAE PDPL, and Indian IT Rules. By using the service, you consent to:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Storage in Singapore-based servers." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Cross-border transfers with appropriate safeguards." />
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 7. Disclaimer */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            7. Disclaimer
          </Typography>
          <Typography variant="body1">
            Sargen provides assessments and recommendations “as-is” without warranty. Following recommendations does not guarantee Industry
            4.0 certification.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 8. Limitation of Liability */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            8. Limitation of Liability
          </Typography>
          <Typography variant="body1">
            To the maximum extent permitted by law, Elansol Technologies is not liable for any indirect or consequential losses.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 9. Termination */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            9. Termination
          </Typography>
          <Typography variant="body1">We may suspend or terminate accounts for violations of these terms.</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 10. Governing Law */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            10. Governing Law & Disputes
          </Typography>
          <Typography variant="body1">
            Governing law: Pune, Maharashtra, India. EU and UAE users retain their mandatory statutory rights under local laws.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 11. Contact */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            11. Contact Information
          </Typography>
          <Typography variant="body1">
            For support or complaints: <a href="mailto:sales@elansoltech.com">sales@elansoltech.com</a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
