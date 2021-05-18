import React from "react";
import { forwardRef } from 'react';
import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';
import AddTraining from './AddTraining';
import { PanoramaSharp } from "@material-ui/icons";
import Snackbar from '@material-ui/core/Snackbar';



function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');



  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  useEffect(() => {
    fetchCustomer();
  }, []);


  const openSnackBar = () => {
    setOpen(true);
  }

  const closeSnackBar = () => {
    setOpen(false);
  }

  const fetchCustomer = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  const addCustomer = (selectedCustomer) => {
    fetch("https://customerrest.herokuapp.com/api/customers",
      {
        method: 'POST',
        body: JSON.stringify(selectedCustomer),
        headers: { 'Content-type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          fetchCustomer()
          setMsg("Customer added succesfully!");
          openSnackBar();
        }
        else {
          alert('Something went wrong with the add')
        }
      })
      .catch(err => console.error(err))
  }

  const removeCustomer = (selectedCustomer) => {
    fetch(selectedCustomer.links[0].href,
      {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          fetchCustomer()
          setMsg("Customer deleted succesfully!");
          openSnackBar();
        }
        else {
          alert('Something went wrong with the delete function')
        }
      })
      .catch(err => console.error(err))
  }

  const updateCustomer = (updatedCustomer) => {
    console.log(updatedCustomer);
    fetch(updatedCustomer.links[0].href,
      {
        method: 'PUT',
        body: JSON.stringify(updatedCustomer),
        headers: { 'Content-type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          fetchCustomer()
          setMsg("Customer updated succesfully!");
          openSnackBar();
        }
        else {
          alert('Somerhing went wrong with the update')
        }
      })
      .catch(err => console.error(err))
  }

  const addTraining = (selectedCustomer) => {
    fetch("https://customerrest.herokuapp.com/api/trainings",
      {
        method: 'POST',
        body: JSON.stringify(selectedCustomer),
        headers: { 'Content-type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          fetchCustomer()
          setMsg("Training added succesfully!");
          openSnackBar();
        }
        else {
          alert('Something went wrong with the add')
        }
      })
      .catch(err => console.error(err))
  }

  const columns = [
    {
      title: "Add training",
      field: "",
      render: rowData =>
        <AddTraining link={rowData.links[0].href} addTraining={addTraining} />
    },

    {
      title: "First name",
      field: "firstname"
    },
    {
      title: "Last name",
      field: "lastname"
    },
    {
      title: "Email",
      field: "email"
    },
    {
      title: "Phone",
      field: "phone"
    },
    {
      title: "Address",
      field: "streetaddress"
    },
    {
      title: "Postcode",
      field: "postcode"
    },
    {
      title: "City",
      field: "city"
    }
  ];

  return (

    <div style={{
      marginTop: "11vh"
    }}>
      <h1>Customers</h1>
      <MaterialTable
        icons={tableIcons}
        title=""
        data={customers}
        columns={columns}
        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
        options={{
          filtering: false, sorting: true, rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
          })
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                addCustomer(newData);
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                updateCustomer(newData);
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                removeCustomer(oldData);
                resolve()
              }, 1000)
            }),
        }}
      />
      <Snackbar
        open={open}
        message={msg}
        autoHideDuration={3000}
        onClose={closeSnackBar}
      />
    </div>
  )
}

export default Customerlist;


