import { Skeleton, Table } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import moment from "moment";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

const U2ACashOutHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const axiosPublic = useAxiosPublic()
    const { refetch, data: pointsOutHistory = { shops: [] }, isPending } = useQuery({
        queryKey: ['pointsOutHistory'],
        queryFn: async () => {
            const res = await axiosPublic.get(`${'/self/transaction-history'}/?page=${currentPage}`);
            return res.data;
        }
    });

    console.log("points out", pointsOutHistory);

    // ==========Handle Pagination========
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const fetchData = useCallback(async () => {
        await refetch();
    }, [refetch]);

    useEffect(() => {
        fetchData();
    }, [fetchData, currentPage]);




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
        // {
        //     title: "Flag",
        //     dataIndex: "flag",
        //     key: "flag",
        // },
        {
            title: "Flag",
            dataIndex: "flag",
            key: "flag",
            render: (flag) => {
                return flag === "Debit" ? "Cash In" : "Cash Out";
            }
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
                dataSource={pointsOutHistory?.transactionsHistory || []}
                columns={transectinColumn}
                pagination={{
                    pageSize: pointsOutHistory?.resultPerPage || 10,
                    total: pointsOutHistory?.count || 0,
                    current: currentPage,
                    onChange: handlePageChange,
                    // showSizeChanger: true,
                    // showQuickJumper: true,
                }}
            />
        </div>
    );
};

export default U2ACashOutHistory;