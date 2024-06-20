import { useState,useRef,useEffect,useCallback} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LicenseInfo,DataGridPro } from '@mui/x-data-grid-pro';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TablePagination from '@mui/material/TablePagination';
import { Link,useNavigate } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomerSearch from '../search/CustomerSearch';
import FinishedAlert from '../finishView/FinishedAlert';


const API_PATH = process.env.REACT_APP_API_PATH;

const columnVisibilityModel = {
  id:true
}

export default function CustomerList() {
  LicenseInfo.setLicenseKey('9af075c09b5df7441264261f25d3d08eTz03ODI4MyxFPTE3MzEwNzgzMTkwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [filterRows,setFilterRows] = useState([]);
  const [moneyOpen, setMoneyOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [okOpen,setOkopen] = useState(false);
  const [newPw,setNewPw] = useState('');
  const [customerMoney,setCustomerMoney]= useState(0);
  const [customerId,setCustomerId]= useState(0);
  const [tickets,setTickets]= useState(0);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: '名稱',
      width: 120,
      editable: false,
    },
    {
      field: 'nickName',
      headerName: '暱稱',
      width: 120,
      editable: false,
    },
    {
      field: 'account',
      headerName: '帳號',
      width: 120,
      editable: false,
    },
    {
      field: 'phoneNum',
      headerName: '電話號碼',
      width: 120,
      editable: false,
    },
    {
      field: 'email',
      headerName: '信箱',
      width: 120,
      editable: false,
    },
    {
      field: 'moneyAmount',
      headerName: '錢包',
      width: 120,
      editable: false,
    },
    {
      field: 'creator',
      headerName: '創造者',
      sortable: false,
      width: 160,
    },   
    {
      field: 'createDate',
      headerName: '創建時間',
      width: 180,
      editable: false,
      valueFormatter: (params) => { 
        const date = new Date(params.value || new Date());
        const minutes = (`0${  date.getMinutes()}`).slice(-2); 
        const hours = (`0${  date.getHours()}`).slice(-2);     
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${hours}:${minutes}`;
      }, 
    },
    {
      field: 'editor',
      headerName: '修改者',
      sortable: false,
      width: 160,
    },   
    {
      field: 'editDate',
      headerName: '修改時間',
      width: 180,
      editable: false,
      valueFormatter: (params) => { 
        if(params.value) {
          const date = new Date(params.value);
          const minutes = (`0${  date.getMinutes()}`).slice(-2); 
          const hours = (`0${  date.getHours()}`).slice(-2);     
          return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${hours}:${minutes}`;
        }
          return null;      
      }, 
    },
    {
      field: 'Operation',
      headerName: '操作',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton aria-label="reset" onClick={() => resetPassword(params.row.id)}>
            <LockResetIcon />
          </IconButton>
        </>
  
      ),
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_PATH}/super/customers?pageNumber=${page+1}&pageSize=${rowsPerPage}`);
  
      if (response.status === 200) { 
        setRows(response.data.source);
        setFilterRows(response.data.source);
        setTotalRows(response.data.totalItemCount)
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
  
      if (error.response && error.response.status === 401) {
        // Unauthorized
        navigate('/login', { replace: true });
      } else {
        alert('權限不足 跳回登入頁');
      }
    }
  };
  const handleOkOpen = () => {
    setOkopen(true);
  }
  // eslint-disable-next-line consistent-return
  const resetPassword = async (id) => {
    // 弹出确认对话框
    const confirmReset = window.confirm("您確定要重製密碼？");
    if (!confirmReset) {
      return; // 如果用户点击“取消”，则不执行任何操作
    }
  
    try {
      const response = await axios.put(`${API_PATH}/super/customerpw?id=${id}`);
      if (response.status === 200) {
        setNewPw(response.data.source); // 设置新密码
        handleOkOpen(); // 打开一个成功提示的对话框或其他反馈机制
      }
    } catch (error) {
      console.error('Failed to reset password', error.response || error);
      alert('重製密碼失敗：');
      throw error; // 抛出错误，允许调用者知道操作失败
    }
  }
  const handleMoneyOpenForm = async (row) => {
    setCustomerId(row.id);
    setMoneyOpen(true);
  };

  const handleMoenyCloseForm = async () => {
    setMoneyOpen(false);
  };

// eslint-disable-next-line consistent-return
const updateCustomerIdMoney = async () => {
    const requestData = {
        id:customerId,
        Money: customerMoney,
        Tickets: tickets
    };
    try {
        const response = await axios.put(`${API_PATH}/super/wallet`, requestData);

        if (response.status === 200) {
          handleMoenyCloseForm();
          await fetchData();
        }
    } catch (error) {
        console.log(error.response.data)
    }
};

  useEffect(() => {
    fetchData();
  }, [page,rowsPerPage]); 

  return (
    <>
    <Box sx={{ height: 600, width: '90%',margin:'auto' }}>
      <Grid container spacing={2} style={{marginBottom:'1%'}}>
            <Grid item xs={12} style={{display:'flex',justifyContent:'center'}}>      
                <Typography variant="h2" component="h2">
                    顧客列表 
                </Typography>
            </Grid>
            <CustomerSearch rows={rows} setFilterRows={setFilterRows}/>
      </Grid>
      <DataGridPro
        rows={filterRows}
        columns={columns}
        disableRowSelectionOnClick
        onCellDoubleClick={handleMoneyOpenForm}
      />
      <TablePagination
      component="div"
      count={totalRows}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[50,100,200,500]} 
    />
    </Box>

      <Dialog open={moneyOpen} 
          BackdropProps={{
            style: {
              backgroundColor: 'transparent',
            },
          }}
          PaperProps={{
            style: {
              width: '200px',
            },
          }}
      >
        <DialogTitle style={{justifyContent:'center',display:'flex',fontSize:'16px'}}>派發代幣</DialogTitle>
        <DialogContent>
            <Box sx={{ flexGrow: 0 }}>
                <Grid container spacing={2}>.                  
                    <Grid item xs={12} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                        <TextField
                        fullWidth 
                        id="outlined-number"
                        size="small"
                        label="派發代幣"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setCustomerMoney(e.target.value)}
                        value={customerMoney}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }} style={{justifyContent:'center',display:'flex' }}>
                        <TextField
                        fullWidth 
                        id="outlined-number"
                        size="small"
                        label="派發抽獎券"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setTickets(e.target.value)}
                        value={tickets}
                        />
                    </Grid>
                </Grid>
            </Box> 
        </DialogContent>
        <DialogActions>
              <Button onClick={updateCustomerIdMoney} startIcon={<AttachMoneyIcon/>}>送出</Button>  
              <Button onClick={handleMoenyCloseForm} startIcon={<CancelIcon/>}>取消</Button>  
        </DialogActions>
      </Dialog>
      <FinishedAlert okOpen={okOpen} handleOkClose={()=>setOkopen(false)} title={'操作成功'} message={`新密碼為:${newPw}`}/>
    </>
  );
}

