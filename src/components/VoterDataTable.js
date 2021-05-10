import React from "react";
import {useTable} from "react-table";

export default function VoterDataTable(props) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Last name',
                accessor: "LAST_NAME"
            },
            {
                Header: 'First name',
                accessor: "FIRST_NAME"
            },
            {
                Header: 'Voter ID',
                accessor: "SOS_VOTERID"
            },
            {
                Header: "County #",
                accessor: "COUNTY_NUMBER"
            },
            {
                Header: "DOB",
                accessor: "DATE_OF_BIRTH"
            },
            {
                Header: "Registration date",
                accessor: "REGISTRATION_DATE"
            },
            {
                Header: "Status",
                accessor: "VOTER_STATUS"
            },
            {
                Header: "Party",
                accessor: "PARTY_AFFILIATION"
            },
            {
                Header: "Address",
                accessor: "RESIDENTIAL_ADDRESS1",
            },
            {
                Header: "City",
                accessor: "RESIDENTIAL_CITY"
            },
            {
                Header: "Zipcode",
                accessor: "RESIDENTIAL_ZIP"
            },
            {
                Header: "Congressional district",
                accessor: "CONGRESSIONAL_DISTRICT"
            },
            {
                Header: "Precinct",
                accessor: "PRECINCT_NAME"
            },
            {
                Header: "State rep district",
                accessor: "STATE_REPRESENTATIVE_DISTRICT"
            },
            {
                Header: "State sen district",
                accessor: "STATE_SENATE_DISTRICT"
            },
            {
                Header: "Voting score",
                accessor: "Score"
            },
            {
                Header: "Gen elections",
                accessor: "General"
            },
            {
                Header: "Primaries",
                accessor: "Primary"
            },
            {
                Header: "Special elections",
                accessor: "Special"
            }
        ],
        []
    );

    const data = React.useMemo(
        () => props.data,
        [props.data]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data})

    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}
