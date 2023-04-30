import { useState } from "react";

import { Grid, TextField, Box, Avatar, Stack, Link } from "@mui/material";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import TypesOfClothing from "../../TypesOfClothing.json";

import Status from "../Common/Status";
import Urls from "../../Constants/Urls";

import defaultImage from "../../Assets/nopreview.png";

interface JobViewProps {
  job: JobType;
  user?: UserType;
}

const JobView = (props: JobViewProps) => {
  const { job, user = null } = props;
  const [imageSelected, setImageSelected] = useState<ImageType | null>(job?.images ? job.images[0] : null);

  let wasQuoted: boolean = false;
  if (user !== null) wasQuoted = job.quotes ? job.quotes.length > 0 && job.quotes.some((x) => x.user_id === user.id) : false;

  return (
    <>
      <Grid item xs={12} sx={{ position: "relative" }}>
        Job details <Status status={job.status as StatusType} showLabel={true} wasQuoted={wasQuoted} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled
          id="type_of_clothing"
          name="type_of_clothing"
          label="Type of clothing"
          fullWidth
          value={TypesOfClothing[job.type_of_clothing as TypeOfClothing]}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField disabled id="description" name="description" label="Description" fullWidth multiline rows={4} value={job.description} />
      </Grid>
      <Grid item xs={12}>
        <TextField disabled type="number" id="budget" name="budget" label="Budget" fullWidth value={job.budget} />
      </Grid>
      {job.images && job.images.length > 0 && (
        <>
          <Grid item xs={12}>
            <Stack direction={"row"} spacing={2} sx={{}}>
              <ImageList sx={{ height: 300, width: 100 }} cols={1} rowHeight={90}>
                {job.images.map((image: ImageType, index: number) => (
                  <ImageListItem onClick={() => console.log(image)} key={index}>
                    <Avatar
                      sx={{ cursor: "pointer", width: 80, height: 80 }}
                      onClick={() => setImageSelected(image)}
                      src={`${Urls.baseUrl}/uploads/${image.path}` || defaultImage}
                      alt={image.path}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                {imageSelected && (
                  <>
                    <img
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        maxHeight: "300px",
                        width: "auto",
                        height: "auto",
                        margin: "auto",
                      }}
                      src={`${Urls.baseUrl}/uploads/${imageSelected.path}` || defaultImage}
                      alt={imageSelected.path}
                      loading="lazy"
                    />
                    <Link href={`${Urls.baseUrl}/uploads/${imageSelected.path}`} target="_blank" rel="noopener noreferrer">
                      Download
                    </Link>
                  </>
                )}
              </Box>
            </Stack>
          </Grid>
        </>
      )}
    </>
  );
};

export default JobView;
