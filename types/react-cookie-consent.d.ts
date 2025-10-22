declare module 'react-cookie-consent' {
  import { CSSProperties, ReactNode } from 'react';

  export interface CookieConsentProps {
    location?: 'top' | 'bottom' | 'none';
    buttonText?: ReactNode;
    declineButtonText?: ReactNode;
    cookieName?: string;
    onAccept?: (acceptedByScrolling?: boolean) => void;
    onDecline?: () => void;
    expires?: number;
    enableDeclineButton?: boolean;
    flipButtons?: boolean;
    buttonId?: string;
    declineButtonId?: string;
    containerClasses?: string;
    buttonClasses?: string;
    declineButtonClasses?: string;
    contentClasses?: string;
    style?: CSSProperties;
    buttonStyle?: CSSProperties;
    declineButtonStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    disableStyles?: boolean;
    hideOnAccept?: boolean;
    hideOnDecline?: boolean;
    acceptOnScroll?: boolean;
    acceptOnScrollPercentage?: number;
    buttonWrapperClasses?: string;
    overlay?: boolean;
    overlayClasses?: string;
    overlayStyle?: CSSProperties;
    ariaAcceptLabel?: string;
    ariaDeclineLabel?: string;
    sameSite?: 'strict' | 'lax' | 'none';
    cookieSecurity?: boolean;
    cookieValue?: string;
    declineCookieValue?: string;
    setDeclineCookie?: boolean;
    debug?: boolean;
    children?: ReactNode;
  }

  export default function CookieConsent(props: CookieConsentProps): JSX.Element;
}
