'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function PrivacyPolicyPage() {
  return (
    <Box>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
          Sargen – Privacy Policy
        </Typography>

        {/* Back Arrow */}
        <Box sx={{ mt: 2 }}>
          <ArrowBackIcon onClick={() => window.history.back()} cursor="pointer" titleAccess="Go back" />
        </Box>

        {/* 1. Introduction */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1">
            Sargen (“we,” “our,” “us”), operated by Elansol Technologies, is committed to protecting your privacy and complying with
            applicable data protection laws, including:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="EU General Data Protection Regulation (GDPR)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="UAE Personal Data Protection Law (PDPL)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="India’s Information Technology Act & Rules" />
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 2. Data We Collect */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            2. Data We Collect
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Personal Data:
          </Typography>
          <Typography variant="body1">Name, email address, phone number.</Typography>

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
            Sensitive Data:
          </Typography>
          <Typography variant="body1">Financial details, VAT Number / GST Number.</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 3. Purpose of Data Processing */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            3. Purpose of Data Processing
          </Typography>
          <Typography variant="body1">We process your data to:</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Conduct industry assessments." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Generate reports, roadmaps, and improvement suggestions." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Maintain user accounts and communication." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Comply with applicable legal and tax obligations." />
            </ListItem>
          </List>
          <Typography variant="body1">
            We will not process your personal data for any purpose unrelated to the services without your explicit consent.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 4. Legal Basis */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            4. Legal Basis for Processing (GDPR Article 6)
          </Typography>
          <Typography variant="body1">For users in the EU, our processing is based on:</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Contractual necessity – to provide you with our services." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Legal obligation – for tax and compliance purposes." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Legitimate interests – to improve our services." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Consent – for optional communications and marketing." />
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 5. Data Storage */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            5. Data Storage & Retention
          </Typography>
          <Typography variant="body1">
            <b>Storage Location:</b> Encrypted cloud servers in Singapore.
          </Typography>
          <Typography variant="body1">
            <b>Retention Period:</b> 5 years from the date of collection, unless a longer retention period is required by law.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 6. Data Sharing */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            6. Data Sharing
          </Typography>
          <Typography variant="body1">We do not sell, rent, or trade your data. We may share it only:</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="With regulators or law enforcement when legally required." />
            </ListItem>
            <ListItem>
              <ListItemText primary="With service providers under strict confidentiality agreements." />
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 7. International Data Transfers */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            7. International Data Transfers
          </Typography>
          <Typography variant="body1">
            Your data may be transferred and processed outside your country, including Singapore, in compliance with GDPR and UAE
            cross-border transfer rules. Adequate safeguards (e.g., Standard Contractual Clauses) are in place.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 8. Security Measures */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            8. Security Measures
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="SSL encryption for data in transit." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Data encryption for sensitive fields." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Access control and authentication mechanisms." />
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 9. Breach Notification */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            9. Breach Notification
          </Typography>
          <Typography variant="body1">
            If a data breach occurs, we will notify affected users within 72 hours (GDPR requirement) and without undue delay (UAE PDPL
            requirement) via email, along with details of corrective measures taken.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 10. Your Rights */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            10. Your Rights (GDPR & UAE PDPL)
          </Typography>
          <Typography variant="body1">You may request to:</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Access your data." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Correct inaccuracies." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Request deletion (“Right to be Forgotten”)." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Restrict or object to processing." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Receive your data in a portable format." />
            </ListItem>
          </List>
          <Typography variant="body1">
            Requests can be made to <a href="mailto:sales@elansoltech.com">sales@elansoltech.com</a>. We will respond within 30 days (or 45
            days under UAE PDPL, if extended).
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 11. Governing Law */}
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            11. Governing Law
          </Typography>
          <Typography variant="body1">
            This policy is governed by the laws of Pune, Maharashtra, India, but GDPR and UAE PDPL rights will be respected for users in
            those jurisdictions.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
