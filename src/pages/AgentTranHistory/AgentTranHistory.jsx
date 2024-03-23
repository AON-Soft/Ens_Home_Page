import { Skeleton, Table } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import moment from "moment";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AgentTranHistory = () => {

    const axiosPublic = useAxiosPublic()
    const { data: transectionHistory = { shops: [] }, isPending } = useQuery({
        queryKey: ['transectionHistory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/self/transaction-history');
            return res.data;
        }
    });
    
    console.log("agent transection", transectionHistory);
    const transectinColumn = [
        {
            title: "User Name",
            dataIndex: "receiver",
            key: "receiver",
            render: (value) => <span>{value?.name}</span>,
        },
        {
            title: "Sender",
            dataIndex: "sender",
            key: "sender",
            render: (value) => <span>{value?.name}</span>,
        },
        {
            title: "Amount",
            dataIndex: "transactionAmount",
            key: "transactionAmount",
        },
        {
            title: "ID",
            dataIndex: "transactionID",
            key: "transactionID",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (value, record) => (
                <span>{moment(record.date).format("DD-MM-YY")}</span>
            ),
        },
        {
            title: "Flag",
            dataIndex: "flag",
            key: "flag",
        },
        {
            title: "Type",
            dataIndex: "transactionType",
            key: "transactionType",
        },
        {
            title: "Transaction Relation",
            dataIndex: "transactionRelation",
            key: "transactionRelation",
        },
    ];

    if (isPending) {
        return (
            <div className="bg-gray-100 border rounded py-5 px-2">
                <Skeleton active />
                <Skeleton active className="mt-4" />
            </div>
        );
    }


    return (
        <div>
            <Navbar></Navbar>
            <Table
                className="bg-transparent overflow-x-auto"
                dataSource={transectionHistory?.transactionsHistory || []}
                columns={transectinColumn}
                pagination={{
                    pageSize: transectionHistory?.resultPerPage || 10,
                    total: transectionHistory?.count || 0,
                    // current: currentPage,
                    // onChange: handlePageChange,
                    // showSizeChanger: true,
                    // showQuickJumper: true,
                }}
            />
        </div>
    );
};

export default AgentTranHistory;