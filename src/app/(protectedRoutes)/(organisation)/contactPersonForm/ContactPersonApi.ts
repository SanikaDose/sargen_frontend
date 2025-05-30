export const onboardingApi = protectedApi.injectEndpoints({
  endpoints: (builder) => ({
    submitPointOfContact: builder.mutation<void, { tenantId: string; body: PocPayload }>({
      query: ({ tenantId, body }: { tenantId: string; body: PocPayload }) => ({
        url: `${apiControllerPath.onboarding.root}/${tenantId}${apiControllerPath.onboarding.addPointOfContact}`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(
        arg: { tenantId: string; body: PocPayload },
        { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: Promise<any> },
      ) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage: 'Point Of Contact Added Successfully!',
          errorMessage: 'Failed To Add Point Of Contact!',
          duration: 4000,
        });
      },
      invalidatesTags: (_result: unknown, _error: unknown, { tenantId }: { tenantId: string }) => [
        { type: 'Poc', id: tenantId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useSubmitPointOfContactMutation } = onboardingApi;
