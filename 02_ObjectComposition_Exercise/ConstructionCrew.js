function Solve(worker) {
    if (worker.dizziness === true) {
        worker.levelOfHydrated += worker.weight * 0.1 * worker.experience;
        worker.dizziness = false;
    }

    return worker
}
