export const aboutSection = {
  organisationOnboarding: {
    heading: 'Organisation Details Guide',
    description: `
    <p>Please fill in all required details about your organization:</p>
    <ul style="font-size: 0.9rem; margin-top: 4px;">
      <li><strong>Company name</strong> should match official registration documents</li>
      <li><strong>Website</strong> must include full URL (e.g., https://www.example.com)</li>
      <li><strong>Tax Registration Number (GST / VAT)</strong> should follow your country's official format
        <ul style="padding-left: 40px;">
          <li>For GST (India): 15 alphanumeric characters (e.g., 27AAAAA0000A1Z5)</li>
          <li>For VAT: Format varies by country (e.g., GB123456789, DE123456789)</li>
        </ul>
      </li>
      <li><strong>Revenue</strong> can be entered in:
        <ul style="padding-left: 40px;">
          <li>Thousands (e.g., 1,000)</li>
          <li>Lakhs (e.g., 1,00,000)</li>
          <li>Crores (e.g., 1,00,00,000)</li>
        </ul>
      </li>
      <li><strong>About organization</strong> limited to 1000 characters</li>
    </ul>
    <p style="font-size: 0.9rem; margin-top: 1rem;"><em>All fields marked with * are mandatory for successful onboarding.</em></p>
  `,
  },
  contactPerson: {
    heading: 'Contact Person Information',
    description: `
      <p>Please provide details of your primary contact person:</p>
      <ul style="font-size: 0.9rem; margin-top: 1rem;">
        <li>This should be an authorized representative</li>
        <li>Ensure email and phone number are regularly monitored</li>
        <li>Contact person will receive all system communications</li>
      </ul>
      <p style="font-size: 0.9rem; margin-top: 1rem;"><em>All fields marked with * are mandatory for successful onboarding.</em></p>
    `,
  },
  plantRegistration: {
    heading: 'Plant Registration Guide',
    description: `
    <p>Please provide accurate details about your manufacturing plant:</p>
    <hr />
    <ul style="font-size: 14px; line-height: 1.6;">
      <li><strong>Plant Name</strong>: Official registered name of the facility</li>
      <li><strong>Location</strong>: Physical address of the plant</li>
      <li><strong>Registration No.</strong>: Government-issued registration number</li>
      <li><strong>Tax Registration Number</strong>: 
        Value-added tax (VAT) and goods and services tax (GST) are similar taxes that are levied on the sale of goods and services.<br />
        GST – <code>27AAAAA0000A1Z5</code><br />
        VAT – <code>GB123456789</code>
      </li>
      <li><strong>Industry Type </strong>: Nature of manufacturing (e.g., Automotive, Aerospace, Food and Beverages, Logistic)</li>
      <li><strong>Plant Age</strong>: Years since commencement of operations</li>
      <hr />
      <li><strong>Revenue</strong>:
        <ul style="font-size: 13px; margin-top: 4px;">
          <li>Enter amount</li>
          <li>Select unit (Thousands / Lakhs / Crores)</li>
        </ul>
      </li>
      <li><strong>Assessment</strong>: Use <code>DD-MM-YYYY</code> format</li>
      <li><strong>Point of Contact</strong>: Authorized representative details</li>
    </ul>
    <hr />
    <p><em>All fields marked with * are mandatory for registration.</em></p>
  `,
  },

  industrySelection: {
    heading: 'Industry Selection Guide',
    description: `
      <p>Please select your <strong>primary industry sector</strong>:</p>
      <ul style="font-size: 0.9rem; margin-top: 0.5rem;">
        <li><strong>Single Selection Only</strong> - Choose the one that best represents your core business</li>
        <hr style="margin: 0.5rem 0;" />
        <li><strong>Categories Explained</strong>:
          <ul style="padding-left: 40px; font-size: 0.9rem;">
            <li><strong>Aerospace</strong>: Aircraft, spacecraft, and related systems</li>
            <li><strong>Electronics</strong>: Electronic components and devices</li>
            <li><strong>Automotive</strong>: Vehicle manufacturing and parts</li>
            <li><strong>Other Sectors</strong>: See detailed descriptions below</li>
          </ul>
        </li>
        <hr style="margin: 0.5rem 0;" />
        <li><strong>Can't find your exact industry?</strong> Select the closest match</li>
      </ul>
      <p style="font-size: 0.9rem; margin-top: 1rem;"><em>This selection will determine:
      <br>- Relevant compliance requirements
      <br>- Industry-specific reporting
      <br>- Tailored support resources</em></p>
    `,
  },
  planningHorizon: {
    heading: 'Planning Horizon Selection Guide',
    description: `
    <p style="margin: 0.5rem 0;">Select <strong>one planning horizon</strong> that matches your initiative's timeframe:</p>
    
    <ul style="font-size: 0.9rem;">
      <li>
        <strong>Strategic</strong> (3–5 years):
        <ul style="padding-left: 40px;">
          <li>Long-term organizational goals</li>
          <li>Market positioning</li>
          <li>Major investments</li>
        </ul>
      </li>
      <hr style="margin: 0.5rem 0;" />
      <li>
        <strong>Operational</strong> (1–2 years):
        <ul style="padding-left: 40px;">
          <li>Department-level planning</li>
          <li>Resource allocation</li>
          <li>Process improvements</li>
        </ul>
      </li>
      <hr style="margin: 0.5rem 0;" />
      <li>
        <strong>Tactical</strong> (0–12 months):
        <ul style="padding-left: 40px;">
          <li>Immediate action plans</li>
          <li>Team-level execution</li>
          <li>Short-term KPIs</li>
        </ul>
      </li>
    </ul>
    
    <p style="font-size: 0.9rem; margin-top: 1rem;"><em>Note: This selection will affect:</em></p>
    <ul style="padding-left: 40px; font-size: 0.9rem;">
      <li><em>Reporting requirements</em></li>
      <li><em>Approval workflow</em></li>
      <li><em>Measurement criteria</em></li>
    </ul>
  `,
  },
  kpiSelection: {
    heading: 'KPI Selection Guide',
    description: `
    <p style="margin: 0.5rem 0;">Select <strong>5 KPIs</strong> to track operational performance:</p>
    
    <div style="font-size: 0.9rem;">

      <div>
        <strong>Efficiency</strong>
        <ul style="margin-top: 0.2rem; padding-left: 1rem;">
          <li><strong>Assets</strong>: Utilization rates</li>
          <li><strong>Workforce</strong>: Productivity</li>
          <li><strong>Utilities</strong>: Consumption ratios</li>
        </ul>
      <hr style="margin: 0.5rem 0;" />
        <strong>Quality</strong>
        <ul style="margin-top: 0.2rem; padding-left: 1rem;">
          <li><strong>Process</strong>: Defect rates</li>
          <li><strong>Product</strong>: Returns</li>
        </ul>
      </div>
      <hr style="margin: 0.5rem 0;" />
      <div>
        <strong>Time Metrics</strong>
        <ul style="margin-top: 0.2rem; padding-left: 1rem;">
          <li><strong>To Market</strong>: Development cycle</li>
          <li><strong>To Delivery</strong>: Fulfillment speed</li>
        </ul>
      <hr style="margin: 0.5rem 0;" />
        <strong>Safety/Flexibility</strong>
        <ul style="margin-top: 0.2rem; padding-left: 1rem;">
          <li><strong>Safety</strong>: Incident rates</li>
          <li><strong>Production Flex</strong>: Changeovers</li>
          <li><strong>Workforce Flex</strong>: Cross-training</li>
        </ul>
      </div>
    </div>

    <p style="margin-top: 1rem; font-size: 0.85rem;"><em>Tip: Balance across categories and ensure measurable data exists.</em></p>
  `,
  },
  costProfile: {
    heading: 'Cost Profile Analysis',
    description: `
      <div>
        <p><strong>Cost Allocation Rules</strong></p>
        <ul style="margin-top: 0.2rem; font-size: 0.9rem">
          <li>∑ < 100% → <span style="color: #4CAF50;">Profit</span></li>
          <li>∑ > 100% → <span style="color: #F44336;">Loss</span></li>
          <li>Ideal range: 85-95%</li>
        </ul>
        <hr style="margin: 0.5rem 0;" />
        <p><strong>Key Controls</strong></p>
        <ul style="margin-top: 0.2rem; font-size: 0.9rem">
          <li>Labor + Materials ≤ 65%</li>
          <li>Research & Development + Maintenance ≤ 25%</li>
          <li>Selling, General & Administrative ≤ 15%</li>
        </ul>
      </div>
      
      <p style="margin-top: 1rem; font-size: 0.85rem;"><em>Tip: Balance across categories and ensure measurable data exists.</em></p>
    `,
  },
  impactValues: {
    heading: 'Dimension Selection Guide',
    description: `
    <p style="margin: 0.5rem 0;">Select <strong>4</strong> Impact Values.</p>
  
    <p style="margin-top: 1rem;">This section evaluates impact values like vertical and horizontal integration from the assessment results.</p>
  `,
  },
};
