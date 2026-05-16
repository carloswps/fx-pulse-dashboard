import { Box, Container, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchPairs } from '../../../shared/services/marketService';

export default function DashboardPage() {
  const { data: pairs } = useQuery({
    queryKey: ['pairs'],
    queryFn: fetchPairs,
  });

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1600, py: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {pairs?.map((pair) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={pair.code}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {pair.code.replace('-', '/')}
              </Typography>
              <Typography variant="h5" sx={{ mt: 0.5, fontFamily: '"JetBrains Mono", monospace' }}>
                {pair.rate.toFixed(4)}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: pair.change >= 0 ? 'success.main' : 'error.main' }}
              >
                {pair.changePercent >= 0 ? '+' : ''}
                {pair.changePercent.toFixed(2)}%
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
