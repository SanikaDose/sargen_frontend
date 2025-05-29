import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Stepper from '@/components/Stepper/Stepper';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { CustomButton } from '@/components/CustomButton/CustomButton';

function OrganizationOnbording() {
  return (
    <>
      {/* stepper component */}
      <Grid
        sx={{
          borderRadius: '15px',
          // mt: 1,
          // boxShadow: 4,
          padding: 1,
          //  border: '1px solid green',
          height: '12%',
        }}
      >
        <Stepper
          steps={[
            { label: 'Logo' },
            { label: 'Name' },
            { label: 'Website' },
            { label: 'GST IN' },
            { label: 'Revenue' },
            { label: 'No. of Employee' },
          ]}
        />
      </Grid>
      {/* heading */}
      <Grid
        sx={{
          height: '5%',
          // mx: 2,
          //   border: '1px solid blue'
        }}
      >
        <Typography variant="h6" sx={{}}>
          Organization Details
        </Typography>
      </Grid>
      {/* <Grid
        container
        sx={{
          //    border: '1px solid red',
          // mx: 2,
          height: '37%',
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      > */}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',

          flexDirection: {
            xs: 'column', // extra-small screens and up
            sm: 'column', // small screens and up
            md: 'column', // medium screens and up
            lg: 'row', // large screens and up
          },
        }}
      >
        {/* Left- Image Uploader */}
        <Box sx={{ display: 'flex', width: '27%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <ImageUploader imageProp="/images/default-logo-image.png?ignore" />
        </Box>

        {/* Right- Input Fields */}
        <Grid size={{ md: 7 }}>
          <InputWithLabel label="Name of the company" name="name" type="text" placeholder="Enter Name of the company" />
          <InputWithLabel label="Company Website" name="website" type="text" placeholder="Enter company website" />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputWithLabel label="GST In Details" name="gstin" type="text" placeholder="Enter GST IN no" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputWithLabel label="Country" name="country" type="text" placeholder="Select from Drop Down" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* </Grid> */}
      {/* <Grid
        container
        sx={{
          height: '10%',
          //  mx: 2
        }}
        spacing={2}
      >
        <Grid size={{ md: 5 }}>
          <InputWithLabel
            label="Organization Revenue"
            name="TotalRevenue"
            type="text"
            placeholder="Enter Total Revenue"
          />
        </Grid>
        <Grid size={{ md: 2 }}>
          <InputWithLabel label="UOM" name="uom" type="text" placeholder="UOM" />
        </Grid>

        <Grid size={{ md: 5 }}>
          <InputWithLabel label="Number Of Employee" name="numberEmp" type="text" placeholder="Enter Total no" />
        </Grid>
    </Grid> */}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <InputWithLabel
            label="Organization Revenue"
            name="TotalRevenue"
            type="text"
            placeholder="Enter Total Revenue"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <InputWithLabel label="UOM" name="uom" type="text" placeholder="UOM" />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <InputWithLabel label="Number Of Employee" name="numberEmp" type="text" placeholder="Enter Total no" />
        </Grid>
      </Grid>

      <Grid
        sx={{
          // mx: 2,
          height: '21%',
          //    border: '1px solid yellow'
        }}
      >
        <InputWithLabel
          label="About Organization"
          name="OrgDetails"
          type="text"
          placeholder="Enter Organization Details"
          multiline
          rows={3}
        />
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        sx={{
          p: 1,
          borderRadius: 4,
          backgroundColor: '#B0E0E6',
          // height: '11%',
          // mx: 2,
          //   display: 'flex',
          //   alignItems: 'center',
          border: '1px solid purple',
        }}
        // size={{ xs: 12 }}
      >
        <Grid>
          <CustomButton children="Back" variant="contained" color="#10557C" icon="left" height="55px" width="80px" />
        </Grid>
        <Grid>
          <CustomButton children="Next" variant="contained" color="#10557C" icon="right" height="55px" width="80px" />
        </Grid>
      </Grid>
    </>
  );
}
export default OrganizationOnbording;
