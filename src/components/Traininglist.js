import React from "react";
import { forwardRef } from 'react';
import { useState, useEffect } from "react";
import MaterialTable, { MTableBodyRow } from "material-table";
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
import Moment from 'react-moment';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';


<script src="https://unpkg.com/moment@2.22.2/min/moment.min.js"></script>

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
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
    fetchTrainings();
  }, []);

  const openSnackBar = () => {
    setOpen(true);
  }

  const closeSnackBar = () => {
    setOpen(false);
  }

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.log(err))
  }

  const deleteTraining = (selectedRow) => {
    console.log(selectedRow.id)
    fetch('https://customerrest.herokuapp.com/api/trainings/' + selectedRow.id,
      { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          fetchTrainings();
          setMsg("Training deleted succesfully!");
          openSnackBar();
        } else {
          alert('Something went wrong in deletion');
        }
      }
      )
      .catch(err => console.error(err))
  }

  const columns = [
    {
      title: "Date",
      field: "date",
      render: row =>
        <Moment format="DD.MM.YYYY HH.mm A">{row.date}</Moment>,
      type: "datetime"
    },
    {
      title: "Duration",
      field: "duration",
    },
    {
      title: "Activity",
      field: "activity"
    },
    {
      title: "Firstname",
      field: "customer.firstname"
    },
    {
      title: "Lastname",
      field: "customer.lastname"
    }
  ];


  return (
    <div style={{
      marginTop: "11vh"
    }}>

      <h1>Trainings</h1>

      <MaterialTable
        icons={tableIcons}
        title=""
        data={trainings}
        columns={columns}
        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
        options={{
          filtering: false, sorting: true, rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
          })
        }}
        editable={{
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(oldData);
                deleteTraining(oldData);
                resolve();
              }, 1000)
            })
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

export default Traininglist;


