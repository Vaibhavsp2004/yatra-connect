
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { predictRideDemand } from '@/utils/modelWrapper';
import { useToast } from '@/components/ui/use-toast';

const ModelTester = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const testModel = async () => {
    setIsLoading(true);
    try {
      // Test the prediction model
      const predictions = await predictRideDemand();
      setResult(predictions);
      
      toast({
        title: "Model Test Successful",
        description: `Prediction model returned ${predictions.length} areas with high demand.`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error testing model:', error);
      toast({
        title: "Model Test Failed",
        description: "There was an error testing the prediction model. See console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Test Prediction Model</h3>
      <Button 
        onClick={testModel} 
        className="bg-namma-purple mb-4"
        disabled={isLoading}
      >
        {isLoading ? 'Testing...' : 'Run Model Test'}
      </Button>
      
      {result && (
        <div className="mt-4">
          <h4 className="text-md font-medium mb-2">Results:</h4>
          <div className="bg-muted p-3 rounded-md text-sm max-h-80 overflow-y-auto">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ModelTester;
