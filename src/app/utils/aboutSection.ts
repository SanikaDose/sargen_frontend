export const aboutSection = {
  organisationOnboarding: {
    heading: 'Organisation Details Guide',
    description: `
      <p>Please fill in all required details about your organization:</p>
      <ul>
        <li><strong>Company name</strong> should match official registration documents</li>
        <li><strong>Website</strong> must include full URL (e.g., https://www.example.com)</li>
        <li><strong>GSTIN</strong> should be 15 characters in the format: 27AAAAA0000A1Z5</li>
        <li><strong>Revenue</strong> can be entered in:
          <ul>
            <li>Thousands (e.g., 1,000)</li>
            <li>Lakhs (e.g., 1,00,000)</li>
            <li>Crores (e.g., 1,00,00,000)</li>
          </ul>
        </li>
        <li><strong>About organization</strong> limited to 200 characters</li>
      </ul>
      <p><em>All fields marked with * are mandatory for successful onboarding.</em></p>
    `,
  },
  contactPerson: {
    heading: 'Contact Person Information',
    description: `
      <p>Please provide details of your primary contact person:</p>
      <ul>
        <li>This should be an authorized representative</li>
        <li>Ensure email and phone number are regularly monitored</li>
        <li>Contact person will receive all system communications</li>
      </ul>
      <p><em>All fields marked with * are mandatory for successful onboarding.</em></p>
    `,
  },
  plantRegistration: {
    heading: 'Plant Registration Guide',
    description: `
      <p>Please provide accurate details about your manufacturing plant:</p>
      <ul>
        <li><strong>Plant Name</strong>: Official registered name of the facility</li>
        <li><strong>Location</strong>: Physical address of the plant</li>
        <li><strong>Registration No.</strong>: Government-issued registration number</li>
        <li><strong>GSTIN</strong>: 15-character GST identification number (e.g., 27AAAAA0000A1Z5)</li>
        <li><strong>Type</strong>: Nature of manufacturing (e.g., Automotive, Pharma, FMCG)</li>
        <li><strong>Plant Age</strong>: Years since commencement of operations</li>
        <li><strong>Revenue</strong>:
          <ul>
            <li>Enter amount</li>
            <li>Select unit (Thousands/Lakhs/Crores)</li>
          </ul>
        </li>
        <li><strong>Assessment/Debrief Dates</strong>: Use DD-MM-YYYY format</li>
        <li><strong>Point of Contact</strong>: Authorized representative details</li>
      </ul>
      <p><em>All fields marked with * are mandatory for registration.</em></p>
    `,
  },
  industrySelection: {
    heading: 'Industry Selection Guide',
    description: `
      <p>Please select your <strong>primary industry sector</strong>:</p>
      <ul>
        <li><strong>Single Selection Only</strong> - Choose the one that best represents your core business</li>
        <li><strong>Categories Explained</strong>:
          <ul>
            <li><strong>Aerospace</strong>: Aircraft, spacecraft, and related systems</li>
            <li><strong>Electronics</strong>: Electronic components and devices</li>
            <li><strong>Automotive</strong>: Vehicle manufacturing and parts</li>
            <li><strong>Other Sectors</strong>: See detailed descriptions below</li>
          </ul>
        </li>
        <li><strong>Can't find your exact industry?</strong> Select the closest match</li>
      </ul>
      <p><em>This selection will determine:
      <br>- Relevant compliance requirements
      <br>- Industry-specific reporting
      <br>- Tailored support resources</em></p>
    `,
  },
  planningHorizon: {
    heading: 'Planning Horizon Selection Guide',
    description: `
      <p>Select <strong>one planning horizon</strong> that matches your initiative's timeframe:</p>
      
      <ul>
        <li><strong>Strategic</strong> (3-5 years):
          <ul>
            <li>Long-term organizational goals</li>
            <li>Market positioning</li>
            <li>Major investments</li>
          </ul>
        </li>
        
        <li><strong>Operational</strong> (1-2 years):
          <ul>
            <li>Department-level planning</li>
            <li>Resource allocation</li>
            <li>Process improvements</li>
          </ul>
        </li>
        
        <li><strong>Tactical</strong> (0-12 months):
          <ul>
            <li>Immediate action plans</li>
            <li>Team-level execution</li>
            <li>Short-term KPIs</li>
          </ul>
        </li>
      </ul>
      
      <p><em>Note: This selection will affect:
      <br>- Reporting requirements
      <br>- Approval workflow
      <br>- Measurement criteria</em></p>
    `,
  },
  kpiSelection: {
    heading: 'KPI Selection Guide',
    description: `
      <p>Select <strong>5 KPIs</strong> to track operational performance:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.9rem;">
        <div>
          <strong>Efficiency</strong>
          <ul style="margin-top: 0.2rem;">
            <li><strong>Assets</strong>: Utilization rates</li>
            <li><strong>Workforce</strong>: Productivity</li>
            <li><strong>Utilities</strong>: Consumption ratios</li>
          </ul>
          
          <strong>Quality</strong>
          <ul style="margin-top: 0.2rem;">
            <li><strong>Process</strong>: Defect rates</li>
            <li><strong>Product</strong>: Returns</li>
          </ul>
        </div>
        
        <div>
          <strong>Time Metrics</strong>
          <ul style="margin-top: 0.2rem;">
            <li><strong>To Market</strong>: Development cycle</li>
            <li><strong>To Delivery</strong>: Fulfillment speed</li>
          </ul>
          
          <strong>Safety/Flexibility</strong>
          <ul style="margin-top: 0.2rem;">
            <li><strong>Safety</strong>: Incident rates</li>
            <li><strong>Production Flex</strong>: Changeovers</li>
            <li><strong>Workforce Flex</strong>: Cross-training</li>
          </ul>
        </div>
      </div>
      
      <p style="margin-top: 0.5rem; font-size: 0.85rem;"><em>Tip: Balance across categories and ensure measurable data exists.</em></p>
    `,
  },
  costProfile: {
    heading: 'Cost Profile Analysis',
    description: `
      <div>
        <p><strong>Cost Allocation Rules</strong></p>
        <ul style="margin-top: 0.2rem;">
          <li>∑ < 100% → <span style="color: #4CAF50;">Profit</span></li>
          <li>∑ > 100% → <span style="color: #F44336;">Loss</span></li>
          <li>Ideal range: 85-95%</li>
        </ul>
        <p><strong>Key Controls</strong></p>
        <ul style="margin-top: 0.2rem;">
          <li>Labor + Materials ≤ 65%</li>
          <li>R&D + Maintenance ≤ 25%</li>
          <li>SG&A ≤ 15%</li>
        </ul>
      </div>
      
      <p style="margin-top: 0.5rem; font-size: 0.85rem;"><em>Tip: Balance across categories and ensure measurable data exists.</em></p>
    `,
  },
};
