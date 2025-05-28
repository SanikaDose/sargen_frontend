import Stepper from '@/components/Stepper/Stepper';
import { Grid } from '@mui/material';

const page = () => {
  return (
    // TODO:Grid with container and size 12
    <Grid container size={12}>
      <Grid size={{ md: 12 }}>
        <Stepper></Stepper>
      </Grid>
    </Grid>
    // TODO:Grid with stepper 12
    //TODO:Grid with Assesor profile size 4 edit image upload certificate cancel and save
    //TODO:Grid with Assesor info size 8 first name last name and table
    //TODO:Grid with 12 and dive 12/3 = 4
    // TODO grid table  with 12
  );
};

export default page;
