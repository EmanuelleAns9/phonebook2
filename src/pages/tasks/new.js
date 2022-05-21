import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const CreateTask = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const { title, description } = newTask;
  const { push, query } = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});


  const getTask = async () => {
    //corregir const response = await fetch(`http://localhost:3000/api/tasks/${query.id}`);
    const response = await fetch(`/api/tasks/${query.id}`);
    const data = await response.json();
    setNewTask({ title: data.title, description: data.description });
  };

  useEffect(() => {
    if (query.id) getTask();
  }, [query.id]);

  const validate = () => {
    let errors = {};
    if (!title) {
      errors.title = "Title is Required";
    }
    if (!description) {
      errors.description = "description is Required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if (query.id) {
      await updateTask();
    } else {
      await createTask();
    }

    await push("/");
  };

  const updateTask = async () => {
    try {
      //corregir await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
      await fetch(`/api/tasks/${query.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      //corregir await fetch(" http://localhost:3000/api/tasks", {
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div>
            <h1>{query.id ? "Update User" : "Create User"}</h1>
            <div>
              {isSubmit ? (
                <Loader active inline="centered" />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                    error={
                      errors.title ? { content: "Please enter a full name" } : null
                    }
                    label="Full name"
                    placeholder="Enter full name"
                    name="title"
                    onChange={handleChange}
                    value={title}
                    autoFocus
                  />

                  <Form.TextArea
                    error={
                      errors.description
                        ? { 
                        content: "Please enter a cellphone" }
                        :null
                        
                    }
                    label="Cellphone"
                    placeholder="Enter Cellphone"
                    name="description"
                    onChange={handleChange}
                    value={description}
                    
                  />

                  <Button type="submit" primary>
                    {query.id ? "Update" : "Submit"}
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateTask;
