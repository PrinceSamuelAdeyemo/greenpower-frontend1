import { Button, Table } from 'flowbite-react'
import React from 'react'

const UserWeightedPoints = () => {
  return (
    <div>
        <div className='flex px-4'>
            <p className='text-2xl font-bold'>User Weighted points</p>
            <div className='flex gap-3 ml-auto'>
                <Button className='border text-c-lightgreen' color="white">
                    Sales Record
                </Button>
                <Button className='border bg-c-lightgreen text-white' color="">
                    Select Month
                </Button>
            </div>
        </div>
        <div className='mt-8'>
            <Table className='w-full'>
                <Table.Head className='text-center normal-case border-b-2 border-c-lightgreen'>
                    <Table.HeadCell className='bg-white text-lg'>Product</Table.HeadCell>
                    <Table.HeadCell className='bg-white text-lg'>Serial Number</Table.HeadCell>
                    <Table.HeadCell className='bg-white text-lg'>Accumulated WP</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    <Table.Row className='text-center border-b-2 border-c-lightgreen'>
                        <Table.Cell>Yellow Box</Table.Cell>
                        <Table.Cell>AZXHE636672GE82</Table.Cell>
                        <Table.Cell>5points</Table.Cell>
                    </Table.Row>
                    <Table.Row className='text-center border-b-2 border-c-lightgreen'>
                        <Table.Cell>AP+</Table.Cell>
                        <Table.Cell>AZXHE636672GE82</Table.Cell>
                        <Table.Cell>18points</Table.Cell>
                    </Table.Row>
                    <Table.Row className='text-center'>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell><p className='font-bold text-md'>Total Weighted points =<span className='text-c-lightgreen'>23</span> </p></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    </div>
  )
}

export default UserWeightedPoints