import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import StudyListItem from '../../src/components/StudyListItem';
import { FullStudy, Study } from '../../src/data/types';

// Mock the studies functions
vi.mock('../../src/data/studies', () => ({
  getFirstPassageFromStudy: vi.fn((study) => {
    if (study.slug === 'history-direction') return 'Ephesians 1:9-14';
    return 'Genesis 1:1-5';
  }),
}));

// Mock Ionic components
vi.mock('@ionic/react', () => ({
  IonIcon: ({ icon, color, style }: any) => (
    <span 
      data-testid="ion-icon" 
      data-icon={icon} 
      data-color={color} 
      style={style}
    />
  ),
  IonItem: ({ children, id, className, routerLink, disabled, lines, detail }: any) => (
    <div
      data-testid="ion-item"
      id={id}
      className={className}
      data-router-link={routerLink}
      data-disabled={disabled}
      data-lines={lines}
      data-detail={detail}
    >
      {children}
    </div>
  ),
  IonLabel: ({ children, className }: any) => (
    <div data-testid="ion-label" className={className}>
      {children}
    </div>
  ),
  IonNote: ({ children, slot }: any) => (
    <div data-testid="ion-note" data-slot={slot}>
      {children}
    </div>
  ),
}));

describe('StudyListItem', () => {
  const fullStudy: FullStudy = {
    index: 1,
    title: "History's Direction",
    slug: "history-direction",
    summary: "The Bible is not a random collection of moral lessons",
    leadersInfo: {
      notes: "Some leader notes",
      what: "What section",
      soWhat: "So what section"
    },
    questions: []
  };

  const basicStudy: Study = {
    index: 2,
    title: "Coming Study",
    slug: "coming-study"
  };

  const defaultProps = {
    totalNumberOfStudies: 10,
    isCompleted: false,
  };

  test('renders study title correctly', () => {
    render(<StudyListItem study={fullStudy} {...defaultProps} />);
    expect(screen.getByText("History's Direction")).toBeInTheDocument();
  });

  test('shows first passage in note slot', () => {
    render(<StudyListItem study={fullStudy} {...defaultProps} />);
    
    const note = screen.getByTestId('ion-note');
    expect(note).toHaveTextContent('Ephesians 1:9-14');
    expect(note).toHaveAttribute('data-slot', 'end');
  });

  test('shows book icon when study is not completed', () => {
    render(<StudyListItem study={fullStudy} {...defaultProps} isCompleted={false} />);
    
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveAttribute('data-icon', expect.stringContaining('svg'));
    expect(icon).toHaveAttribute('data-color', 'primary');
  });

  test('shows checkmark icon when study is completed', () => {
    render(<StudyListItem study={fullStudy} {...defaultProps} isCompleted={true} />);
    
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveAttribute('data-icon', expect.stringContaining('svg'));
    expect(icon).toHaveAttribute('data-color', 'primary');
  });

  test('applies completed class when study is completed', () => {
    render(<StudyListItem study={fullStudy} {...defaultProps} isCompleted={true} />);
    
    const item = screen.getByTestId('ion-item');
    expect(item).toHaveClass('completed-study');
  });

  test('does not apply completed class when study is not completed', () => {
    render(<StudyListItem study={fullStudy} {...defaultProps} isCompleted={false} />);
    
    const item = screen.getByTestId('ion-item');
    expect(item).not.toHaveClass('completed-study');
  });

  test('has router link for full studies', () => {
    render(<StudyListItem study={fullStudy} {...defaultProps} />);
    
    const item = screen.getByTestId('ion-item');
    expect(item).toHaveAttribute('data-router-link', '/study/history-direction');
    expect(item).toHaveAttribute('data-disabled', 'false');
  });

  test('is disabled for basic studies (not full studies)', () => {
    render(<StudyListItem study={basicStudy} {...defaultProps} />);
    
    const item = screen.getByTestId('ion-item');
    expect(item).not.toHaveAttribute('data-router-link');
    expect(item).toHaveAttribute('data-disabled', 'true');
  });

  test('has correct item ID based on study index', () => {
    render(<StudyListItem study={fullStudy} {...defaultProps} />);
    
    const item = screen.getByTestId('ion-item');
    expect(item).toHaveAttribute('id', 'study-1');
  });

  test('has proper styling attributes', () => {
    render(<StudyListItem study={fullStudy} {...defaultProps} />);
    
    const item = screen.getByTestId('ion-item');
    expect(item).toHaveAttribute('data-lines', 'inset');
    expect(item).toHaveAttribute('data-detail', 'true');
    expect(item).toHaveClass('ion-padding-left');
  });

  test('label has text wrap class', () => {
    render(<StudyListItem study={fullStudy} {...defaultProps} />);
    
    const label = screen.getByTestId('ion-label');
    expect(label).toHaveClass('ion-text-wrap');
  });

  test('icon has correct styling', () => {
    render(<StudyListItem study={fullStudy} {...defaultProps} />);
    
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveStyle({
      marginRight: '16px',
      fontSize: '24px'
    });
  });
});