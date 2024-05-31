import Tooltip from "@mui/material/Tooltip";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/system";

export const CustomTooltip = styled(({ className, ...props }) => (
  // tooltip on top of the element, with adjusted distance
  <Tooltip
    {...props}
    classes={{ popper: className }}
    placement="top"
    PopperProps={{
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -8], // Adjust the second value to control the distance
          },
        },
      ],
    }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "12px",
    borderRadius: "4px",
    padding: "6px 8px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "transparent",
  },
}));
