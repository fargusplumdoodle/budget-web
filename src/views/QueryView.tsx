import { Box, styled } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { Expression } from "../components/query/types";
import QueryForm from "../components/query";

const Container = styled(Box)(({ theme: { spacing } }) => ({
  display: "flex",
  flexDirection: "column",
  gap: spacing(1),
}));

const QueryView: FunctionComponent = () => {
  const [expressions, setExpressions] = useState<Expression<any>[]>([]);

  return (
    <Container>
      <QueryForm
        expressions={expressions}
        onChangeExpressions={setExpressions}
        // showReports
      />
    </Container>
  );
};

export default QueryView;
