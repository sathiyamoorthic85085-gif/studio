import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

export class ObjectDetector {
  constructor() {
    this.model = null;
    this.isLoaded = false;
  }

  async loadModel() {
    try {
      await tf.ready();
      this.model = await cocoSsd.load();
      this.isLoaded = true;
      console.log('Object detection model loaded');
    } catch (error) {
      console.error('Error loading model:', error);
    }
  }

  async detectObjects(imageElement) {
    if (!this.isLoaded) {
      await this.loadModel();
    }

    try {
      const predictions = await this.model.detect(imageElement);
      return predictions;
    } catch (error) {
      console.error('Error detecting objects:', error);
      return [];
    }
  }

  // Check for specific objects related to dress code
  checkDressCode(predictions) {
    const requiredItems = ['person', 'tie', 'shirt', 'jacket'];
    const detectedItems = predictions.map(p => p.class);
    
    const violations = [];
    const compliance = {};
    
    // Check for required items
    requiredItems.forEach(item => {
      compliance[item] = detectedItems.includes(item);
      if (!compliance[item] && item !== 'person') {
        violations.push(`Missing: ${item}`);
      }
    });
    
    // Check for prohibited items
    const prohibitedItems = ['sweatshirt', 'hat', 'sunglasses'];
    prohibitedItems.forEach(item => {
      if (detectedItems.includes(item)) {
        violations.push(`Prohibited: ${item}`);
      }
    });
    
    return {
      isCompliant: violations.length === 0,
      violations,
      detectedItems,
      compliance
    };
  }

  // Check for ID card
  checkForIDCard(predictions) {
    const idCard = predictions.find(p => 
      p.class === 'book' || p.class === 'card' || p.class === 'wallet'
    );
    
    return {
      hasID: !!idCard,
      confidence: idCard ? idCard.score : 0
    };
  }
}

// Singleton instance
export const objectDetector = new ObjectDetector();
