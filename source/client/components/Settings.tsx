import React, { useState } from 'react'
import { Container, Box, Typography, Tab, Tabs } from '@mui/material'

import PaymentMethods from './PaymentMethods'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Settings(){
	const [value, setValue] = useState(0);
  const handleChange = (_: any, newValue: number) => setValue(newValue)

	return (
		<Container sx={{padding: 0}}
      className="p-8 w-full h-full mt-[62px]">
			<Box className="pb-2">
				<h2 className="text-xl font-semibold">Settings</h2>
			</Box>
			<Box>
			  <Box sx={{ width: '100%' }}>
        	<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="settings tab">
              <Tab label="Payment Methods" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <PaymentMethods/>
          </TabPanel>
        </Box>
		  </Box>
	  </Container>
	)
}
