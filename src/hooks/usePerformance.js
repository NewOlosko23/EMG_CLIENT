import { useEffect, useRef, useState } from 'react';

// Performance monitoring hook
export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkRequests: 0
  });

  const startTime = useRef(performance.now());
  const renderStartTime = useRef(0);

  useEffect(() => {
    // Measure initial load time
    const measureLoadTime = () => {
      const loadTime = performance.now() - startTime.current;
      setMetrics(prev => ({ ...prev, loadTime }));
    };

    // Measure memory usage (if available)
    const measureMemory = () => {
      if (performance.memory) {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) // MB
        }));
      }
    };

    // Measure network requests
    const measureNetwork = () => {
      if (performance.getEntriesByType) {
        const networkEntries = performance.getEntriesByType('navigation');
        setMetrics(prev => ({
          ...prev,
          networkRequests: networkEntries.length
        }));
      }
    };

    // Run measurements
    measureLoadTime();
    measureMemory();
    measureNetwork();

    // Set up periodic memory monitoring
    const interval = setInterval(measureMemory, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const startRenderTimer = () => {
    renderStartTime.current = performance.now();
  };

  const endRenderTimer = () => {
    if (renderStartTime.current > 0) {
      const renderTime = performance.now() - renderStartTime.current;
      setMetrics(prev => ({ ...prev, renderTime }));
    }
  };

  const getPerformanceScore = () => {
    // Simple performance score calculation
    let score = 100;
    
    if (metrics.loadTime > 3000) score -= 20; // Slow load
    if (metrics.renderTime > 100) score -= 15; // Slow render
    if (metrics.memoryUsage > 50) score -= 10; // High memory usage
    
    return Math.max(0, score);
  };

  return {
    metrics,
    startRenderTimer,
    endRenderTimer,
    getPerformanceScore
  };
};

// Hook for measuring component render performance
export const useRenderPerformance = (componentName) => {
  const renderStartTime = useRef(0);
  const renderCount = useRef(0);

  useEffect(() => {
    renderStartTime.current = performance.now();
    renderCount.current += 1;

    return () => {
      const renderTime = performance.now() - renderStartTime.current;
      
      // Log slow renders in development
      if (process.env.NODE_ENV === 'development' && renderTime > 16) {
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  return {
    renderCount: renderCount.current
  };
};

// Hook for measuring API call performance
export const useApiPerformance = () => {
  const [apiMetrics, setApiMetrics] = useState({
    totalCalls: 0,
    averageResponseTime: 0,
    slowestCall: 0,
    errorRate: 0
  });

  const measureApiCall = async (apiCall, endpoint) => {
    const startTime = performance.now();
    let success = true;

    try {
      const result = await apiCall();
      return result;
    } catch (error) {
      success = false;
      throw error;
    } finally {
      const endTime = performance.now();
      const duration = endTime - startTime;

      setApiMetrics(prev => {
        const newTotalCalls = prev.totalCalls + 1;
        const newAverageResponseTime = 
          (prev.averageResponseTime * prev.totalCalls + duration) / newTotalCalls;
        const newSlowestCall = Math.max(prev.slowestCall, duration);
        const newErrorRate = success ? prev.errorRate : prev.errorRate + 1;

        // Log slow API calls in development
        if (process.env.NODE_ENV === 'development' && duration > 1000) {
          console.warn(`Slow API call to ${endpoint}: ${duration.toFixed(2)}ms`);
        }

        return {
          totalCalls: newTotalCalls,
          averageResponseTime: newAverageResponseTime,
          slowestCall: newSlowestCall,
          errorRate: newErrorRate
        };
      });
    }
  };

  return {
    apiMetrics,
    measureApiCall
  };
};

// Hook for monitoring bundle size and loading performance
export const useBundlePerformance = () => {
  const [bundleMetrics, setBundleMetrics] = useState({
    totalSize: 0,
    loadTime: 0,
    chunkCount: 0
  });

  useEffect(() => {
    const measureBundlePerformance = () => {
      // Get resource timing information
      const resources = performance.getEntriesByType('resource');
      const jsResources = resources.filter(resource => 
        resource.name.includes('.js') && !resource.name.includes('node_modules')
      );

      const totalSize = jsResources.reduce((sum, resource) => 
        sum + (resource.transferSize || 0), 0
      );

      const loadTime = Math.max(...jsResources.map(resource => 
        resource.responseEnd - resource.startTime
      ));

      setBundleMetrics({
        totalSize: Math.round(totalSize / 1024), // KB
        loadTime: Math.round(loadTime),
        chunkCount: jsResources.length
      });
    };

    // Measure after a short delay to ensure all resources are loaded
    const timer = setTimeout(measureBundlePerformance, 1000);

    return () => clearTimeout(timer);
  }, []);

  return bundleMetrics;
};
