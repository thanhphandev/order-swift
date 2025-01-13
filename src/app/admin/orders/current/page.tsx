import Table from '@/components/admin/order/table'
import { getOrders } from '@/actions/order.action'
import React from 'react'

const page = async() => {
    const orders = await getOrders()
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {orders.reverse().map((order) => (
                <Table
                    key={order._id}
                    table={order.table}
                    orderType={order.typeOrder}
                    orderId={order._id}
                    createAt={order.createdAt}
                    status={order.status}
                />  
            ))

            }
        </div>
    )


}

export default page