import { Button, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

import weighted_points_api from '../utils/weighted_points_api'

const UserWeightedPoints = (props) => {
    var cookieDetails = props.myCookie
    const [w_points, setW_points] = useState()
    const [userWeightedPoints, setUsersWeightedPoints] = useState([])
    const [admin_status, setAdmin_status] = useState(false)
    
    const getUsersWeightedPoints = () => {
        if (cookieDetails["ADMIN"] == 1){
            setAdmin_status(true)
            weighted_points_api.get("/getPointsByUsers.php")
            .then((response) =>{
                console.log("response for admin",response)
                var received_data_status_code = response.data["status_code"]
                if (received_data_status_code == 400){
                    setW_points(0)
                }
                else{
                    var received_data = response.data["data"]
                    var total_weighted_points = 0
                    for (let i = 0; i < received_data.length; i++){
                        total_weighted_points += Number(received_data[i]["total_weighted_points"])
                    }
                    setW_points(total_weighted_points)
                    setUsersWeightedPoints(received_data)
                }
                
            })
        }
        else{
            weighted_points_api.post("/getPointsByUser.php", {
                "userToken": cookieDetails["userToken"]
            })
            .then((response) =>{
                console.log("response for user", response)
                var received_data_status_code = response.data["status_code"]
                if (received_data_status_code == 400){
                    setW_points(0)
                }
                else(
                    setW_points(1)
                )
            })
        }
        }
        

    useEffect(() => {
        console.log("About to run.")
        getUsersWeightedPoints()
    }, [weighted_points_api])

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
            <Table className='w-full table-fixed'>
                <Table.Head className='text-center normal-case border-b-2 border-c-lightgreen'>
                    <Table.HeadCell className='bg-white text-lg'>User</Table.HeadCell>
                    <Table.HeadCell className='bg-white text-lg'>No of orders</Table.HeadCell>
                    <Table.HeadCell className='bg-white text-lg'>Accumulated WP</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                {userWeightedPoints?.map((each_weighted_point, index) => (
                    <Table.Row className='text-center border-b-2 border-c-lightgreen'>
                        <Table.Cell>{each_weighted_point["user"]}</Table.Cell>
                        <Table.Cell>{each_weighted_point["user"]}</Table.Cell>
                        <Table.Cell>{each_weighted_point["user"]}</Table.Cell>
                    </Table.Row>
                    ))
                }
                    
                    <Table.Row className='text-center'>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell><p className='font-bold text-md'>{admin_status ? 'Total Weighted points = ': 'Total points = '}<span className='text-c-lightgreen'>{w_points}</span> </p></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    </div>
  )
}

export default UserWeightedPoints