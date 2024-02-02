import { CheckBox } from "@mui/icons-material";
import {
  Card,
  CardContent,
  FormControl,
  Divider,
  FormControlLabel,
  FormGroup,
  Button,
} from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

export const BaseInfo: React.FC = (props) => {
  return (
    <FormControl fullWidth>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", ml: 2, mt: 1 }}>
            <Typography sx={{ ml: 1 }} variant="h5">
              기본 설정
            </Typography>
          </Box>
          <Divider />
          <Box>
            <FormGroup>
              <FormControlLabel
                control={<CheckBox name="usedMealHistories" />}
                label="식권이력 활성화"
                // onChange={onChangeSettingCheckBox}
              />
            </FormGroup>
          </Box>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="info" variant="contained">
            저장
          </Button>
        </Box>
      </Card>
    </FormControl>
  );
};
export default BaseInfo;
