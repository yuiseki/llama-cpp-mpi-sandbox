mpirun -host localhost -n 1 uname -a
mpirun -hostfile ./hostfile -n 2 -v echo "hoge"
