import "./Create.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import { useDataContext } from "../../context/dataContext";
import { Box } from "@mui/material";

const Create = () => {
  const { state, createAd } = useDataContext();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const cancel = () => navigate(-1);

  const onSubmit = async (data) => {
    try {
      await createAd(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="wrapper-create">
      <Form
        title="Create Advertisement"
        tags={state.tags}
        categories={state.categories}
        register={register}
        errors={errors}
        cancel={cancel}
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
      ></Form>
    </Box>
  );
};

export default Create;
