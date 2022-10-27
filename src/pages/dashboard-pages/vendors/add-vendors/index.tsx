import React, { useEffect } from 'react'

import { Grid, GridItem, Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useHistory } from 'react-router'

import { useEasyActions } from '../../../../store/hooks'
import { apiManager } from '../../../../utils/api-manager'
import { VendorEditingForm } from '../../../../components/vendor/vendor-editing-form'
import DashboardPageContent from '../../../../components/dashboard-page-content/dashboard-page-content'
import DashboardHeader from '../../../../components/dashboard-structure/dashboard-header'
import Sidebar from '../../../../components/dashboard-structure/sidebar'
import BulkUpload from './bulk-upload'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { MixpanelComponent } from '../../../../utils/mixpanel'
import { mixpanelEvents } from '../../../../constants/mixpanel'

export interface AddVendorsProps {}

const AddVendors: React.FC<AddVendorsProps> = (props) => {
  const toast = useToast()
  const history = useHistory()
  const { setisAppLoading, setLoadingBackgroundColor } = useEasyActions((state) => state.loader)

  useEffect(() => {
    MixpanelComponent(mixpanelEvents.AddNewVendorPage_Landed)
  }, [])

  const addVendor = async (vendorData: any) => {
    setLoadingBackgroundColor('rgba(0,0,0,0.1)')
    setisAppLoading(true)

    MixpanelComponent(mixpanelEvents.AddNewVendorPage_AddingNewVendor)

    apiManager
      .fetch({
        name: 'CreateVendor',
        config: { data: vendorData }
      })
      .then((res) => {
        if (res.data.status === 'success') {
          MixpanelComponent(mixpanelEvents.AddNewVendorPage_NewVendorAdded)

          toast({
            title: 'Vendor created.',
            description: 'A new vendor has been created in your organization.',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right'
          })
          history.replace('/vendors')
        }
      })
      .catch((e) => {
        MixpanelComponent(mixpanelEvents.AddNewVendorPage_AddingNewVendorFailed)

        toast({
          title: 'Something was wrong!',
          description: e.response?.data?.message || 'Please try again later!',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        })
      })
      .finally(() => {
        setisAppLoading(false)
      })
  }

  const handleCacheError = () => ''

  return (
    <>
      <Sidebar active="/vendors" />
      <DashboardHeader arrow={true} title="Add Vendor(s)" />
      <DashboardPageContent filterSidebar={false}>
        <Grid
          // gridTemplateColumns={{ lg: '1fr', xl: '8fr 1fr' }}
          gridRowGap={{ base: '16px', xl: '0' }}
          gridColumnGap={{ base: '0', xl: '30px' }}
          mb="50px"
          // maxW="1440px"
        >
          <GridItem
            bgColor={useColorModeValue('bgColor', 'bgColorDark')}
            border="1px solid rgba(0, 0, 0, 0.2)"
            borderRadius="4px"
            px={{ base: '16px', xl: '25px' }}
            py="50px"
            // maxW="1440px"
          >
            <VendorEditingForm
              vendorEmpty={handleCacheError}
              vendorType="Add"
              submitText="Add +"
              onSubmit={addVendor}
              headerComponent={() => (
                <Text fontSize="24px" mb="30px" lineHeight="1">
                  Add a Vendor
                </Text>
              )}
            />
          </GridItem>
          {/* <GridItem
            bgColor={useColorModeValue('bgColor', 'bgColorDark')}
            border="1px solid rgba(0, 0, 0, 0.2)"
            borderRadius="4px"
            px={{ base: '16px', xl: '25px' }}
            py="50px"
            maxW="500px"
          >
            <BulkUpload />
          </GridItem> */}
        </Grid>
      </DashboardPageContent>
    </>
  )
}

export default AddVendors
