/**
 * Format a number as currency
 */
export const formatCurrency = (
    value: number, 
    currency: string = 'USD', 
    locale: string = 'en-US'
  ): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  };
  
  /**
   * Format a percentage
   */
  export const formatPercentage = (
    value: number, 
    locale: string = 'en-US'
  ): string => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };
  
  /**
   * Format a phone number
   */
  export const formatPhoneNumber = (value: string): string => {
    // Basic US phone number formatting
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return value;
  };
  
  /**
   * Truncate text to a specific length
   */
  export const truncateText = (text: string, length: number = 50): string => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  };