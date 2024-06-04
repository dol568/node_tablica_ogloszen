import { useDataContext } from "../../context/dataContext";
import SearchForm from "../SearchForm/SearchForm";
import { Box, Chip, Rating, TableSortLabel } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import "./Advertisements.css";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

const Advertisements = () => {
  const {
    state,
    deleteAd,
    updateAd,
    paginationAdvertisements,
    setPaginationAdvertisements,
    sortParams,
    setSortParams,
  } = useDataContext();
  const { ...stateAuth } = useAuthContext();
  const navigate = useNavigate();

  const [currentAdId, setCurrentAdId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPaginationAdvertisements({ ...paginationAdvertisements, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    setPaginationAdvertisements({ limit: +event.target.value, page: 1 });
  };

  const handleClickOpen = (e, id) => {
    e.stopPropagation();
    setOpen(true);
    setCurrentAdId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentAdId(null);
  };

  const handleEdit = (e, id) => {
    setCurrentAdId(id);
    setIsEdit(true);
  };
  const closeEdit = () => {
    setIsEdit(false);
    reset();
  };

  const handleDeleteAd = async () => {
    if (currentAdId) {
      try {
        await deleteAd(currentAdId);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
    handleClose();
  };

  const onSubmit = async (data) => {
    
    try {
      await updateAd(currentAdId, data);
      navigate("/");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { id: "id", label: "Id", minWidth: 30 },
    { id: "author", label: "User", minWidth: 120 },
    { id: "title", label: "Title", minWidth: 170 },
    { id: "category", label: "Category", minWidth: 120, align: "center" },
    { id: "updatedAt", label: "Date", minWidth: 120, align: "right" },
    { id: "price", label: "Price", minWidth: 120, align: "right" },
    { id: "ratingsAverage", label: "Rating", minWidth: 120, align: "center" },
    { id: "actions", label: "Actions", minWidth: 120, align: "right" },
  ];

  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  const rows = [];

  let id_counter = 1 + (paginationAdvertisements.page - 1) * paginationAdvertisements.limit;

  state.ads.docs &&
    state.ads.docs.forEach((ad) => {
      const row = {
        id: id_counter++,
        author: ad.author && `${ad.author.firstName} ${ad.author.lastName}`,
        title: ad.title,
        category: ad.category,
        updatedAt: new Date(ad.updatedAt).toLocaleDateString(),
        price: ad.price,
        ratingsAverage: ad.ratingsAverage,
        actions: "",
        _id: ad.id,
        authorId: ad.author && ad.author.id,
        ad: ad,
      };

      rows.push(row);
    });

  const ad = () => {
    if (currentAdId) {
      const row = rows.find((row) => row._id === currentAdId);
      return row.ad;
    }
  };

  const handleRowClick = (_id) => {
    navigate(`/dashboard/advertisements/${_id}`);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = sortParams.orderBy === property && sortParams.order === "asc";
    setSortParams({ order: isAsc ? "desc" : "asc", orderBy: property });
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      if (ad()) {
        return ad();
      }
    }, [currentAdId]),
  });

  return (
    <Box sx={{ flexGrow: 1, width: "80%", alignItems: "center", display: "flex", flexDirection:"column", justifyContent: "center" }}>
      {!isEdit && (
        <>
          <SearchForm sx={{flexGrow: 1}}/>
          <Paper
            sx={{ width: "100%", overflow: "hidden", borderRadius: 2, border: "solid 0.2px #dcdcdc", mb: 3 }}
            elevation={0}
          >
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ minWidth: column.minWidth, backgroundColor: "#dcdcdc" }}
                        sortDirection={sortParams.orderBy === column.id ? sortParams.order : false}
                      >
                        {" "}
                        {column.id === "id" || column.id === "author" || column.id === "actions" ? (
                          column.label
                        ) : (
                          <TableSortLabel
                            active={sortParams.orderBy === column.id}
                            direction={sortParams.orderBy === column.id ? sortParams.order : "asc"}
                            onClick={createSortHandler(column.id)}
                          >
                            {column.label}
                          </TableSortLabel>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow hover>
                      <TableCell colSpan={columns.length} sx={{ cursor: "pointer" }}>
                        No results match this filter
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((row) => {
                      return (
                        <TableRow style={{ cursor: "pointer" }} hover key={row._id}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "title" ? (
                                  <span onClick={() => handleRowClick(row._id)}>{value}</span>
                                ) : column.id === "category" ? (
                                  <Chip label={value} color="primary" />
                                ) : column.id === "ratingsAverage" ? (
                                  value > 0 ? (
                                    <Rating value={value} readOnly />
                                  ) : value === 0 ? (
                                    "Not rated yet"
                                  ) : (
                                    ""
                                  )
                                ) : column.id === "actions" ? (
                                  stateAuth && stateAuth.user.id === row.authorId ? (
                                    <>
                                      <EditIcon
                                        color="success"
                                        style={{ fontSize: 30 }}
                                        onClick={(e) => handleEdit(e, row._id)}
                                      />
                                      <DeleteForeverIcon
                                        color="error"
                                        style={{ fontSize: 30 }}
                                        onClick={(e) => handleClickOpen(e, row._id)}
                                      />
                                    </>
                                  ) : (
                                    ""
                                  )
                                ) : column.format && typeof value === "number" ? (
                                  column.format(value)
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              style={{ display: "flex", justifyContent: "flex-end" }}
              component="div"
              rowsPerPageOptions={[5, 10, 20]}
              count={state.ads && state.ads.totalDocs ? state.ads.totalDocs : 0}
              rowsPerPage={paginationAdvertisements.limit}
              page={paginationAdvertisements.page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}
      <ConfirmationDialog
        title="advertisement"
        open={open}
        handleClose={handleClose}
        handleDialogClick={handleDialogClick}
        handleDelete={handleDeleteAd}
      />
      {isEdit && (
        <Box className="wrapper-create">
          <Form
            categories={state.categories}
            values={ad()}
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            cancel={closeEdit}
            title="Edit Advertisement"
            tags={state.tags}
            control={control}
          />
        </Box>
      )}
    </Box>
  );
};

export default Advertisements;
