// src/app/(protectedRoutes)/(organization)/page.tsx

'use client';

import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Stepper from '@/components/Stepper/Stepper';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { CustomButton } from '@/components/CustomButton/CustomButton';
const OrganizationPage = () => {
    return (
        <>
            {/* stepper component */}
            <Grid>
                <Box
                    sx={{
                        padding: '20px',
                        borderRadius: '15px',
                        m: 1,
                        boxShadow: 4
                    }}
                >
                    <Stepper steps={[{ label: 'Logo' }, { label: 'Name' }, { label: 'Website' }, { label: 'GST IN' }, { label: 'Revenue' }, { label: 'No. of Employee' }]} />
                </Box>
            </Grid>
            {/* heading */}

            <Grid>
                <Typography variant="h6" sx={{ mx: 2 }}>
                    Organization Details
                </Typography>
            </Grid>
            <Grid container sx={{ mx: 10 }}>
                {/* Left- Image Uploader */}
                <Grid size={{md:5}} >
                    <Grid container alignItems="center" style={{ height: '100%' }}>
                        <Grid >
                            <ImageUploader />
                        </Grid>
                    </Grid>
                </Grid>

                {/* Right- Input Fields */}
                <Grid size={{ md: 7 }}>
                    <InputWithLabel
                        label="Name of the company"
                        name="name"
                        type="text"
                        placeholder="Enter Name of the company"
                    />
                    <InputWithLabel
                        label="Company Website"
                        name="website"
                        type="text"
                        placeholder="Enter company website"
                    />
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <InputWithLabel
                                label="GST In Details"
                                name="gstin"
                                type="text"
                                placeholder="Enter GST IN no"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <InputWithLabel
                                label="Country"
                                name="country"
                                type="text"
                                placeholder="Select from Drop Down"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mx: 3 }}>
                <Grid size={{ md: 4 }}>
                    <InputWithLabel
                        label="Organization Revenue"
                        name="TotalRevenue"
                        type="text"
                        placeholder="Enter Total Revenue"
                    />
                </Grid>
                <Grid size={{ md: 2 }}>
                    <InputWithLabel
                        label="UOM"
                        name="uom"
                        type="text"
                        placeholder="UOM"
                    />
                </Grid>
                <Grid size={{ md: 1 }}></Grid>
                <Grid size={{ md: 5 }} >
                    <InputWithLabel
                        label="Number Of Employee"
                        name="numberEmp"
                        type="text"
                        placeholder="Enter Total no"
                    />
                </Grid>
            </Grid>

            <Grid sx={{ mx: 2 }}>
                <InputWithLabel
                    label="About Organization"
                    name="OrgDetails"
                    type="text"
                    placeholder="Enter Organization Details"
                />

            </Grid>
            <Grid container justifyContent="space-between" sx={{ m: 2, borderRadius: 4, backgroundColor: '#B0E0E6', p: 1 }}>
                <Grid >
                    <CustomButton
                        children="Back"
                        variant="contained"
                        color="#10557C"
                        icon="left"
                        height="50px"
                        width="80px"
                    />
                </Grid>
                <Grid >
                    <CustomButton
                        children="Next"
                        variant="contained"
                        color="#10557C"
                        icon="right"
                        height="50px"
                        width="80px"   
                    />
                </Grid>
            </Grid>
        </>
    )
};

export default OrganizationPage;
