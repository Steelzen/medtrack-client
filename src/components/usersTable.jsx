import Table from "../common/table";

const UsersTable = ({ users, onSort, sortColumn }) => {
  const columns = [
    { path: "first_name", label: "First Name" },
    { path: "last_name", label: "Last Name" },
    { path: "date_of_birth", label: "Date of Birth" },
    { path: "phone", label: "Phone" },
  ];

  return (
    <div>
      <h3>Users List</h3>
      <Table
        columns={columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </div>
  );
};

export default UsersTable;
