import { publicApi } from '@/store/api/publicApis/basePublicApi';
import { apiControllerPath } from '@/store/api/routes';
import { EnquiryRequest, EnquiryResponse } from './enquiry.types';
import { rtkAPIToast } from '@/app/utils/rtkAPIToast';

export const enquiryApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    submitEnquiry: builder.mutation<EnquiryResponse, EnquiryRequest>({
      query: (enquiryData) => ({
        url: `${apiControllerPath.enquiry.root}`,
        method: 'POST',
        body: enquiryData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Enquiry submitted successfully!',
          errorMessage: 'Failed to submit enquiry.',
        });
      },
    }),
  }),
});

export const { useSubmitEnquiryMutation } = enquiryApi;
