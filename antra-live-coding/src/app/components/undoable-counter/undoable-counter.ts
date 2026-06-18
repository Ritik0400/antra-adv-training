import { Component, computed, signal } from '@angular/core';

interface CounterAction {
  delta: number;
  before: number;
  after: number;
  label: string;
}

@Component({
  selector: 'app-undoable-counter',
  imports: [],
  templateUrl: './undoable-counter.html',
  styleUrl: './undoable-counter.scss'
})
export class UndoableCounter {
  count = signal<number>(0);

  private undoStack = signal<CounterAction[]>([]);
  private redoStack = signal<CounterAction[]>([]);

  history = computed(() => this.undoStack());

  canUndo = computed(() => this.undoStack().length > 0);
  canRedo = computed(() => this.redoStack().length > 0);

  updateCount(delta: number): void {
    const before = this.count();
    const after = before + delta;

    const action: CounterAction = {
      delta,
      before,
      after,
      label: delta > 0 ? `+${delta}` : `${delta}`
    };

    this.count.set(after);

    this.undoStack.update(actions => {
      const updatedActions = [...actions, action];

      return updatedActions.slice(-50);
    });

    // A new action clears the redo history.
    this.redoStack.set([]);
  }

  undo(): void {
    const actions = this.undoStack();

    if (actions.length === 0) {
      return;
    }

    const lastAction = actions[actions.length - 1];

    this.count.set(lastAction.before);

    this.undoStack.set(actions.slice(0, -1));

    this.redoStack.update(actionsToRedo => [
      ...actionsToRedo,
      lastAction
    ]);
  }

  redo(): void {
    const actionsToRedo = this.redoStack();

    if (actionsToRedo.length === 0) {
      return;
    }

    const lastUndoneAction =
      actionsToRedo[actionsToRedo.length - 1];

    this.count.set(lastUndoneAction.after);

    this.redoStack.set(actionsToRedo.slice(0, -1));

    this.undoStack.update(actions => {
      const updatedActions = [
        ...actions,
        lastUndoneAction
      ];

      return updatedActions.slice(-50);
    });
  }
}