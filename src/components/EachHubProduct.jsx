import React from 'react'
import { Button, Card, Dropdown, Table, Select } from 'flowbite-react';


const EachHubProduct = ( { index, hubProductAvailable, pdtImage, pdtName, pdtSerialNumber, outrightPrice, getProductToUpdate, outrightCommission, logisticsFees, weightedPoints, pdtToken } ) => {
  return (
    <Table.Body className='font-semibold'>
        
        {hubProductAvailable &&
            <Table.Row className='border-b-2 border-c-lightgreen'>
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell><img src={pdtImage} alt='Product Image' /></Table.Cell>
                <Table.Cell className=''>{pdtName}</Table.Cell>
                <Table.Cell className='text-center'>{pdtSerialNumber}</Table.Cell>
                <Table.Cell className='text-center'>{outrightPrice}</Table.Cell>
                <Table.Cell className='flex justify-center'>
                    <Button onClick={() => (getProductToUpdate(pdtSerialNumber, pdtName, pdtImage, outrightPrice, outrightCommission, logisticsFees, weightedPoints, pdtToken))} outline className='text-c-lightgreen'>Update</Button>
                </Table.Cell>
        </Table.Row>}
        
    </Table.Body>
  )
}

export default EachHubProduct