import { Button, ButtonGroup, Card, CardContent, MenuItem, Stack, TextField, Typography } from "@mui/material";
import Select from "react-select";
import { Controller } from "react-hook-form";

const Form = ({ register, handleSubmit, errors, cancel, title, values, categories, tags, control }) => {
  const getTags = (tags) =>
    tags.reduce((acc, tag) => {
      acc.push({ value: tag, label: tag });
      return acc;
    }, []);
  const allTags = getTags(tags);
  const selectedTags = values ? getTags(values.tags) : [];

  return (
    <Card elevation={0} sx={{ marginBottom: 2, borderRadius: 2, border: "solid 0.2px #c1c2c8", overflow: "visible" }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          {title}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            size="small"
            type="text"
            label="Title"
            defaultValue={values ? values.title : ""}
            color="info"
            fullWidth
            className="form-control"
            {...register("title", { required: true, minLength: 10 })}
            sx={{ mb: 3 }}
            helperText={
              errors.title && errors.title.type === "required" ? (
                <span style={{ color: "red" }}>Title is required</span>
              ) : errors.title && errors.title.type === "minLength" ? (
                <span style={{ color: "red" }}>Title must be at least 10 characters</span>
              ) : (
                ""
              )
            }
          />

          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            size="small"
            type="text"
            defaultValue={values ? values.content : ""}
            color="info"
            fullWidth
            multiline
            label="Content"
            rows={5}
            className="form-control"
            {...register("content", { required: true, minLength: 10 })}
            helperText={
              errors.content && errors.content.type === "required" ? (
                <span style={{ color: "red" }}>Content is required</span>
              ) : errors.content && errors.content.type === "minLength" ? (
                <span style={{ color: "red" }}>Content must be at least 10 characters</span>
              ) : (
                ""
              )
            }
            sx={{ mb: 3 }}
          />
          <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
            <TextField
              select
              defaultValue={values ? values.category : ""}
              label="Category"
              helperText={
                errors.category && errors.category.type === "required" ? (
                  <span style={{ color: "red" }}>Category is required</span>
                ) : (
                  ""
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
              className="form-control"
              {...register("category", {
                required: true,
              })}
              sx={{ mb: 3 }}
            >
              {categories.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 0.01,
              }}
              defaultValue={values ? values.price : ""}
              variant="outlined"
              size="small"
              label="Price"
              type="number"
              {...register("price", {
                min: 0,
                max: 999999,
                required: true,
              })}
              className="form-control"
              helperText={
                errors.price && errors.price.type === "required" ? (
                  <span style={{ color: "red" }}>Price is required</span>
                ) : errors.price && errors.price.type === "min" ? (
                  <span style={{ color: "red" }}>Price must be at least 0</span>
                ) : errors.price && errors.price.type === "max" ? (
                  <span style={{ color: "red" }}>Price is too high</span>
                ) : (
                  ""
                )
              }
              sx={{ mb: 3 }}
            />
          </Stack>

          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value, name, ref }, formState }) => (
              <div style={{ marginBottom: 20 }}>
                <Select
                  {...register("tags", { required: true })}
                  defaultValue={values ? selectedTags : ""}
                  isMulti
                  className="hamid"
                  ref={ref}
                  name={name}
                  placeholder={"Select tags"}
                  styles={{
                    placeholder: (provided, state) => ({
                      ...provided,

                      fontSize: 13,
                    }),
                  }}
                  options={allTags}
                  value={allTags.find((c) => {
                    c.value === value;
                  })}
                  onChange={(selectedOptions) => onChange(selectedOptions.map((option) => option.value))}
                />
                {errors.tags && errors.tags.type === "required" && (
                  <small style={{ color: "red", marginLeft: 20, fontSize: 13 }}>At least one tag is required</small>
                )}
              </div>
            )}
          />

          <ButtonGroup variant="contained" className="float-end" sx={{ mb: 3 }}>
            <Button onClick={cancel} variant="outlined">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </ButtonGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
