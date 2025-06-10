// 'use client';
// import FileUploadButton from '@/components/FileUploadButton/FileuploadButton';
// import ImageUploader from '@/components/ImageUpload/ImageUpload';
// import Stepper from '@/components/Stepper/Stepper';
// import { useAddOrganizationsInformationMutation } from '@/store/api/protectedApis/onboardingApi';
// import { Grid, Typography } from '@mui/material';
// import { useEffect } from 'react';

// const page = () => {
//   const stepperList = [{ image: {} }, { profileDetails: {} }, {}];
//   const [addOrganisationInformation] = useAddOrganizationsInformationMutation();
//   async function test() {
//     const payload = {
//       companyName: 'ElansolNext test',
//       website: 'www.test.com',
//       gstin: '12312',
//       revenue: 1231,
//       about: '12312fdsdfdplfmwdopmopfwdmgopmwdf',
//       numberOfEmployees: 11,
//       numberOfLines: 4,
//     };
//     await addOrganisationInformation({
//       tenantId: 'tanpure-Corp-c8e1eeba-65d8-4351-837c-d1b5b5f45bbf',
//       body: payload,
//     }).unwrap();
//   }
//   useEffect(() => {
//     test();
//   }, []);
//   return (
//     // TODO:Grid with container and size 12

//     <Grid container size={12}>
//       <Grid size={{ md: 12 }} border={'1px solid black'}>
//         <Stepper></Stepper>
//       </Grid>
//       <Grid size={12}>
//         <Grid size={{ md: 4, lg: 8, xl: 8 }}>
//           {/* For image upload and certificate upload */}
//           <Grid size={12}>
//             <Typography>Assesor profile</Typography>
//           </Grid>
//           <Grid size={12}>
//             <ImageUploader></ImageUploader>
//           </Grid>
//           <Grid size={12}>
//             <FileUploadButton></FileUploadButton>
//           </Grid>
//         </Grid>
//         <Grid>{/* For details */}</Grid>
//       </Grid>
//     </Grid>

//     // TODO:Grid with stepper 12
//     //TODO:Grid with Assesor profile size 4 edit image upload certificate cancel and save
//     //TODO:Grid with Assesor info size 8 first name last name and table
//     //TODO:Grid with 12 and dive 12/3 = 4
//     // TODO grid table  with 12
//   );
// };

// export default page;


import AssessorOnboarding from "./AssessorOnboarding";

const Page = () => {
  return <AssessorOnboarding />;
};

export default Page;

