import { useForm, Controller } from "react-hook-form";
import { useDataContext } from "../../context/dataContext";
import { Button, Card, CardContent, Chip, MenuItem, Select, Stack, TextField, Paper, Grid } from "@mui/material";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";

const defaultValues = {
  author: "",
  title: "",
  content: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  fromDate: "",
  toDate: "",
  tags: [],
};

const SearchForm = () => {
  const { setFilterParams, state } = useDataContext();
  const { register, handleSubmit, reset, control } = useForm({ defaultValues });
  const [checked, setChecked] = useState([]);
  const [showTags, setShowTags] = useState(false);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    return newChecked;
  };

  const onSubmit = (data) => {
    const filteredData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== ""));
    setFilterParams(filteredData);
  };

  const handleReset = () => {
    setChecked([])
    setFilterParams({});
    reset({ ...defaultValues });
  };

  return (
    <Card elevation={0} sx={{ mb: 2, borderRadius: 2, border: "solid 0.2px #c1c2c8" }}>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5} direction="row" sx={{ mb: 2 }}>
            <TextField
              size="small"
              variant="outlined"
              type="text"
              label="Title"
              id="filled-title-input"
              color="info"
              fullWidth
              className="form-control"
              {...register("title")}
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              size="small"
              variant="outlined"
              type="text"
              id="filled-content-input"
              color="info"
              fullWidth
              label="Content"
              className="form-control"
              {...register("content")}
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Controller
              render={({ field }) => (
                <Select {...field} size="small" displayEmpty>
                  <MenuItem disabled value="">
                    Select an author
                  </MenuItem>

                  {state.users.docs &&
                    state.users.docs.map((option, index) => (
                      <MenuItem key={index} value={option.id}>
                        {`${option.firstName} ${option.lastName}`}
                      </MenuItem>
                    ))}
                </Select>
              )}
              control={control}
              name="author"
            />

            <Controller
              render={({ field }) => (
                <Select {...field} size="small" displayEmpty>
                  <MenuItem disabled value="">
                    Select a category
                  </MenuItem>

                  {state.categories && state.categories.map((option,index) => <MenuItem value={option} key={index}>{option}</MenuItem>)}
                </Select>
              )}
              control={control}
              name="category"
            />

            <Button type="submit" variant="contained" color="success" className="float-end">
              Filter
            </Button>
          </Stack>

          <Stack spacing={6} direction="row">
            <TextField
              size="small"
              variant="outlined"
              label="Min Price"
              type="number"
              {...register("minPrice", {
                min: 0,
                max: 999999,
              })}
              className="form-control"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              size="small"
              variant="outlined"
              label="Max Price"
              type="number"
              {...register("maxPrice", {
                min: 0,
                max: 999999,
              })}
              className="form-control"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              size="small"
              variant="outlined"
              label="From Date"
              type="date"
              {...register("fromDate")}
              className="form-control"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              size="small"
              variant="outlined"
              label="To Date"
              type="date"
              {...register("toDate")}
              className="form-control"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              color="secondary"
              variant="outlined"
              size="small"
              sx={{ minWidth: "150px" }}
              onClick={() => setShowTags(!showTags)}
            >
              {!showTags ? "Show Tags" : "Hide Tags"}
            </Button>
            <Button onClick={handleReset} variant="outlined">
              Reset
            </Button>
          </Stack>
          {showTags && (
            <Controller
              onChange={([selectedTags]) => selectedTags}
              render={({ field: { onChange, value } }) => (
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    p: 0,
                    mt: 2,
                  }}
                  elevation={0}
                >
                  <Grid container spacing={1}>
                    {state.tags.map((data, index) => (
                      <Grid item key={index}>
                        <Chip
                          label={data}
                          color={value.includes(data) ? "success" : "default"}
                          icon={value.includes(data) ? <DoneIcon /> : null}
                          onClick={() => onChange(handleToggle(data))}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}
              name="tags"
              control={control}
            />
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
